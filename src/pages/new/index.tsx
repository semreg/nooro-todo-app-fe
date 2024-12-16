import TaskForm from '@/components/TaskForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/api/mutations'
import { TaskFormData } from '@/types'

const NewPage = () => {
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const onCreateTask = async (formData: TaskFormData) => {
    createTaskMutation.mutate({
      ...formData,
      isCompleted: false,
    })
  }

  return <TaskForm mode={'create'} onSubmit={onCreateTask} />
}

export default NewPage
