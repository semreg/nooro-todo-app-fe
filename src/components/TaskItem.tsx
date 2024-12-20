import React, { useMemo } from 'react'
import { Task } from '@/types'
import Image from 'next/image'
import Circle from '@/components/Circle'
import Link from 'next/link'

type Props = {
  /**
   * The task object to display.
   */
  item: Task

  /**
   * Flag indicating if the task is pending. Defaults to `false`.
   */
  isPending?: boolean

  /**
   * Function to toggle the task's completion status.
   */
  toggleTaskStatus: (id: number) => void

  /**
   * Function to remove the task by its ID.
   */
  removeTask: (id: number) => void
}

/**
 * A component that represents a task item.
 * Displays a checkbox (circle) to toggle task completion, the task title, and a delete button.
 */
const TaskItem: React.FC<Props> = ({
  item,
  isPending = false,
  toggleTaskStatus,
  removeTask,
}) => {
  /**
   * Determines the CSS class for the task title based on its completion status.
   * If the task is completed, it applies a line-through and changes the text color.
   */
  const textClass = useMemo(
    () => (item.isCompleted ? 'text-[#808080] line-through' : ''),
    [item.isCompleted]
  )

  /**
   * Handler for toggling the task's completion status when the circle is clicked.
   */
  const onTaskStatusClick = () => {
    toggleTaskStatus(item.id)
  }

  /**
   * Handler for removing the task when the delete icon is clicked.
   */
  const onRemoveTaskClick = () => {
    removeTask(item.id)
  }

  return (
    <div
      className={`flex mt-5 bg-[#262626] border border-solid border-[#333333] rounded-lg p-3 ${isPending ? 'opacity-50' : ''}`}
    >
      {/* Circle representing the task's completion status */}
      <div className="cursor-pointer" onClick={onTaskStatusClick}>
        <Circle
          className="m-1 ml-1.5 h-[20px] w-[20px]"
          color={item.color}
          filled={item.isCompleted}
        >
          {item.isCompleted && (
            <Image src="/check-icon.svg" height="10" alt="Checked" width="10" />
          )}
        </Circle>
      </div>

      {/* Task title wrapped in a link to the task edit page */}
      <Link href={`/edit/${item.id}`} passHref className="flex-1">
        <div className={`flex-1 mx-4 mt-0.5 ${textClass}`}>{item.title}</div>
      </Link>

      {/* Delete icon */}
      <Image
        src="/trash.svg"
        alt="Delete"
        height="30"
        width="30"
        className="h-[30px] cursor-pointer"
        onClick={onRemoveTaskClick}
      />
    </div>
  )
}

export default TaskItem
