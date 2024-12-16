import TaskForm from '@/components/TaskForm'
import { useQuery } from '@tanstack/react-query'
import { fetchTask, fetchTasks } from '@/api/queries'
import { useRouter } from 'next/router'

const EditPage = () => {
  const router = useRouter()

  const { error, data, isLoading } = useQuery({
    queryKey: ['task', router.query.id],
    queryFn: () => fetchTask(`${router.query.id}`),
  })

  if (isLoading) {
    return 'Loading...'
  }

  return <TaskForm item={data} mode={'edit'} />
}

export default EditPage
