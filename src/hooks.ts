import * as React from 'react'
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
  CancelledError,
} from '@tanstack/react-query'

/**
 * Debounce utility that supports cancellation via AbortSignal.
 * Ensures that the operation is delayed by a specified time or canceled if aborted.
 *
 * @param delayMs - The debounce delay in milliseconds.
 * @param signal - Optional AbortSignal to cancel the delay.
 * @returns A promise that resolves after the specified delay or rejects if aborted.
 */
export const debounceWithAbort = (
  delayMs: number,
  signal?: AbortSignal
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, delayMs)

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      reject(new DOMException('Operation aborted', 'AbortError'))
    })
  })
}

/**
 * Custom hook to create a stable callback function.
 * Ensures that the callback maintains the same reference across re-renders.
 *
 * @param callback - The callback function to stabilize.
 * @returns A stable version of the callback function.
 */
export const useStableCallback = <TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn
): ((...args: TArgs) => TReturn) => {
  const callbackRef = React.useRef(callback)

  // Update the ref to the latest callback whenever it changes.
  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Return a memoized wrapper that always calls the latest callback.
  return React.useCallback((...args: TArgs) => callbackRef.current(...args), [])
}

/**
 * Custom hook to create a debounced mutation with support for React Query.
 * This hook delays the execution of the mutation function by a specified delay
 * and supports cancellation if the mutation is retriggered before the delay completes.
 *
 * @typeParam TData - The type of data returned by the mutation.
 * @typeParam TError - The type of error thrown by the mutation.
 * @typeParam TVariables - The type of variables accepted by the mutation.
 * @typeParam TContext - The type of context passed to mutation lifecycle callbacks.
 *
 * @param mutationFn - The original mutation function to wrap with debounce logic.
 * @param options - Mutation options including debounce delay and other React Query options.
 * @returns A React Query mutation result object.
 */
export function useDebouncedMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    delayMs: number
  }
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { delayMs, retry, onMutate, ...restOptions } = options
  const queryClient = useQueryClient()
  const abortControllerRef = React.useRef<AbortController | null>(null)

  // Debounced mutation function with abort handling.
  const debouncedMutationFn = useStableCallback(
    async (variables: TVariables) => {
      // Initialize a new AbortController for this mutation.
      abortControllerRef.current = new AbortController()
      const { signal } = abortControllerRef.current

      // Wait for the debounce delay to complete.
      await debounceWithAbort(delayMs, signal)

      // Call the original mutation function after the delay.
      return mutationFn(variables)
    }
  )

  // Custom retry logic that skips retries for cancellations.
  const customRetry = useStableCallback(
    (failureCount: number, error: TError) => {
      // Skip retry if the error indicates a cancellation.
      if (error instanceof CancelledError) return false

      // Use user-defined retry logic or default to numeric retries.
      return typeof retry === 'function'
        ? retry(failureCount, error)
        : failureCount < (retry as number)
    }
  )

  // Handle mutation initiation with cleanup for prior mutations.
  const handleMutate = useStableCallback(
    async (...args: Parameters<NonNullable<typeof onMutate>>) => {
      // Abort any ongoing mutation.
      abortControllerRef.current?.abort()

      // Clean up discarded optimistic updates for this mutation.
      await Promise.all(
        queryClient
          .getMutationCache()
          .getAll()
          .filter(
            (mutation) => mutation.options.mutationFn === debouncedMutationFn
          )
          .map((mutation) => mutation.destroy())
      )

      // Call the user-defined onMutate callback if provided.
      return onMutate?.(...args)
    }
  )

  return useMutation({
    mutationFn: debouncedMutationFn,
    retry: customRetry,
    onMutate: handleMutate,
    ...restOptions,
  })
}
