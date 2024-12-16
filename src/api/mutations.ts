import { Task, TaskRequest } from '@/types'
import { BASE_URL } from '@/constants'

export const createTask = async (taskRequest: TaskRequest): Promise<Task> => {
  const response = await fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(taskRequest),
  })

  return await response.json()
}

export const updateTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/${task.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(task),
  })

  return await response.json()
}

export const toggleTaskStatus = async (task: Task) => {
  await updateTask({ ...task, isCompleted: !task.isCompleted })
}

export const deleteTask = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  return await response.json()
}
