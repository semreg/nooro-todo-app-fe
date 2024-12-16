import { BASE_URL } from '@/constants'
import { Task } from '@/types'

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(BASE_URL)

  return await response.json()
}

export const fetchTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/${id}`)

  return await response.json()
}
