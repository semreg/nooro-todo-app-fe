import Button from '@/components/Button'
import Chip from '@/components/Chip'
import TaskList from '@/components/TaskList'
import React, { useMemo } from 'react'
import Link from 'next/link'
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchTasks } from '@/api/queries'
import Image from 'next/image'
import TaskItem from '@/components/TaskItem'
import { Task } from '@/types'
import { deleteTask, toggleTaskStatus } from '@/api/mutations'
import * as utils from '@/utils'
import { useDebouncedMutation } from '@/hooks'

const HomePage = () => {
  const createTaskMutationVariables = useMutationState({
    filters: { mutationKey: ['createTask'], status: 'pending' },
    select: (mutation) => mutation.state.variables,
  })

  const isUpdateMutationPending =
    useMutationState({
      filters: { mutationKey: ['updateTask'], status: 'pending' },
      select: (mutation) => mutation.state.variables,
    }).length > 0

  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: !isUpdateMutationPending,
  })

  const queryClient = useQueryClient()

  const toggleTaskStatusMutation = useDebouncedMutation(toggleTaskStatus, {
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTodos = queryClient.getQueryData(['tasks'])

      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        utils.findAndToggleStatus(old, id)
      )

      return { previousTodos }
    },
    delayMs: 1000,
  })

  const removeTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTodos = queryClient.getQueryData(['tasks'])

      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        utils.findByIdAndRemove(old, id)
      )
      return { previousTodos }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTodos)
    },
  })

  const isCreateMutationPending = useMemo(
    () => !!createTaskMutationVariables?.length,
    [createTaskMutationVariables]
  )

  const completedTasksNum = useMemo(
    () => data?.reduce((acc, curr) => (curr.isCompleted ? acc + 1 : acc), 0),
    [data]
  )

  const completedTasksLabel = useMemo(() => {
    return completedTasksNum === 0 || !completedTasksNum
      ? '0'
      : `${completedTasksNum} of ${data?.length} `
  }, [completedTasksNum, data?.length])

  return (
    <>
      <Link href="/new" className="mt-[-25px]">
        <Button
          label="Create task"
          icon={
            <Image
              className="ml-2"
              src="/plus.svg"
              alt="Plus"
              height="16"
              width="16"
            />
          }
        />
      </Link>

      <div className="mt-10 flex w-full justify-between text-sm font-bold">
        <div className="flex">
          <span className="text-[#4EA8DE] mr-2">Tasks</span>
          <Chip label={(data?.length ?? 0).toString()} />
        </div>

        <div className="flex">
          <span className="text-[#8284FA] mr-2">Completed</span>
          <Chip label={completedTasksLabel} />
        </div>
      </div>

      <TaskList
        isCreatePending={isCreateMutationPending}
        isLoading={isLoading}
        items={data}
        toggleTaskStatus={toggleTaskStatusMutation.mutateAsync}
        removeTask={removeTaskMutation.mutate}
      />

      {isCreateMutationPending && (
        <>
          <TaskItem
            item={createTaskMutationVariables[0] as Task}
            isPending
            removeTask={utils.noop}
            toggleTaskStatus={utils.noop}
          />
        </>
      )}
    </>
  )
}

export default HomePage
