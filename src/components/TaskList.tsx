import React from 'react'
import Image from 'next/image'
import { Task } from '@/types'
import TaskItem from '@/components/TaskItem'

type Props = {
  /**
   * A list of tasks to be displayed in the task list.
   * Defaults to an empty array if not provided.
   */
  items?: Task[]

  /**
   * Flag indicating whether the data is currently being loaded.
   */
  isLoading: boolean

  /**
   * Flag indicating whether a task creation operation is pending.
   */
  isCreatePending?: boolean

  /**
   * Function to toggle the status of a task.
   */
  toggleTaskStatus: (id: number) => void

  /**
   * Function to remove a task by its ID.
   */
  removeTask: (id: number) => void
}

/**
 * A component that displays a list of tasks.
 * If the data is loading, it shows a loading indicator.
 * If there are no tasks and no task creation is pending, it shows an empty state.
 * Otherwise, it renders a list of `TaskItem` components.
 */
const TaskList: React.FC<Props> = ({
  items = [],
  isLoading,
  isCreatePending = false,
  toggleTaskStatus,
  removeTask,
}) => {
  if (isLoading) {
    // Show loading indicator when data is being fetched
    return <div className="mt-5">Loading...</div>
  }

  // If there are no tasks and no task creation is pending, show an empty state
  if (items.length === 0 && !isCreatePending) {
    return (
      <div>
        <hr className="mt-5 bg-[#333333] border-0 h-[1px]" />
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-20"
            src="/task-list.svg"
            alt="Task list"
            height={56}
            width={56}
          />
          <span className="mt-3 text-[#808080] font-bold">
            You don&#39;t have any tasks registered yet.
          </span>
          <span className="mt-3 text-[#808080]">
            Create tasks and organize your to-do items
          </span>
        </div>
      </div>
    )
  }

  // Render the list of tasks using the TaskItem component
  return (
    <div>
      {items.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          toggleTaskStatus={toggleTaskStatus}
          removeTask={removeTask}
        />
      ))}
    </div>
  )
}

export default TaskList
