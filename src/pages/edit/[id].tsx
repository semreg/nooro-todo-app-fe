import TaskForm from '@/components/TaskForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTask } from '@/api/queries'
import { useRouter } from 'next/router'
import { updateTask } from '@/api/mutations'
import { Task, TaskFormData } from '@/types'
import * as taskUtils from '@/utils'

const EditPage = () => {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['task', router.query.id],
    queryFn: () => fetchTask(`${router.query.id}`),
  })

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    mutationKey: ['updateTask'],
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTodos = queryClient.getQueryData(['tasks'])

      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        taskUtils.findAndUpdate(old, newTask.id!, newTask)
      )

      return { previousTodos }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const onEditTask = (formData: TaskFormData) =>
    updateTaskMutation.mutate({ ...data, ...formData })

  if (isLoading) {
    return 'Loading...'
  }

  return <TaskForm item={data} mode={'edit'} onSubmit={onEditTask} />
}

export default EditPage
