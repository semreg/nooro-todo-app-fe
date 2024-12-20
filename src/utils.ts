import { Task } from '@/types'

export const noop = () => {}

export const findAndUpdate = (
  tasks: Task[],
  id: number,
  newTask: Partial<Task>
) =>
  tasks.map((task) => {
    if (task.id === id) {
      return { ...task, ...newTask }
    }

    return task
  })

export const findAndToggleStatus = (tasks: Task[], id: number) =>
  tasks.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted }
    }

    return task
  })

export const findByIdAndRemove = (tasks: Task[], id: number) =>
  tasks.filter((task) => task.id !== id)
