import React, { useMemo } from 'react'
import { Task } from '@/types'
import Image from 'next/image'
import Circle from '@/components/Circle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, toggleTaskStatus } from '@/api/mutations'
import Link from 'next/link'

type Props = {
  item: Task
}

const TaskItem: React.FC<Props> = ({ item }) => {
  const queryClient = useQueryClient()

  const toggleTaskStatusMutation = useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const textClass = useMemo(
    () => (item.isCompleted ? 'text-[#808080] line-through' : ''),
    [item.isCompleted]
  )

  // TODO: fix
  const onStatusClick = (event: React.MouseEvent) => {
    event.preventDefault()

    toggleTaskStatusMutation.mutate(item)
  }

  const onTrashClick = (event: React.MouseEvent) => {
    event.preventDefault()

    deleteTaskMutation.mutate(item.id)
  }

  return (
    <Link href={`/edit/${item.id}`} passHref>
      <div className="flex mt-5 bg-[#262626] border border-solid border-[#333333] rounded-lg p-3">
        <div className="cursor-pointer" onClick={onStatusClick}>
          {item.isCompleted ? (
            <Circle
              className="m-1 ml-1.5 h-[20px] w-[20px]"
              color={item.color}
              filled
            >
              <Image src="/check-icon.svg" height="10" alt="10" width="10" />
            </Circle>
          ) : (
            <Circle
              className="m-1 ml-1.5 h-[20px] w-[20px]"
              color={item.color}
            />
          )}
        </div>

        <div className={`flex-1 mx-4 mt-0.5 ${textClass}`}>{item.title}</div>

        <Image
          src="/trash.svg"
          alt="Delete"
          height="30"
          width="30"
          className="h-[30px] cursor-pointer"
          onClick={onTrashClick}
        />
      </div>
    </Link>
  )
}

export default TaskItem
