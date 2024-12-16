import React from 'react'
import Image from 'next/image'
import { Task } from '@/types'
import TaskItem from '@/components/TaskItem'

type Props = {
  items?: Task[]
  isLoading: boolean
}

const TaskList: React.FC<Props> = ({ items, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!items?.length) {
    return (
      <div>
        <hr className="mt-5 bg-[#333333] border-0 h-[1px]" />
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mt-20"
            src="/task-list.svg"
            alt="Task list"
            height="56"
            width="56"
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

  return (
    <div>
      {items.map((item) => (
        <TaskItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default TaskList
