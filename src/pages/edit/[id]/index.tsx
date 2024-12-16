import TaskForm from '@/components/TaskForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTask } from '@/api/queries'
import { useRouter } from 'next/router'
import { updateTask } from '@/api/mutations'
import { TaskFormData } from '@/types'

const EditPage = () => {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['task', router.query.id],
    queryFn: () => fetchTask(`${router.query.id}`),
  })

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
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
