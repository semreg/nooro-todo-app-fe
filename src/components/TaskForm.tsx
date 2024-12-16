import React, { ChangeEventHandler, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Circle from '@/components/Circle'
import Button from '@/components/Button'
import { Color, Task } from '@/types'
import { COLOR_OPTIONS } from '@/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, updateTask } from '@/api/mutations'
import { useRouter } from 'next/router'

type Props = {
  mode: 'create' | 'edit'
  item?: Task
}

const TaskForm: React.FC<Props> = ({ mode, item }) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>(item?.title || '')
  const [selectedColor, setSelectedColor] = useState<Color>(
    item?.color || 'RED'
  )

  const queryClient = useQueryClient()

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const onColorChange = (v: Color) => {
    setSelectedColor(v)
  }

  const onSubmit = () => {
    if (mode === 'create') {
      createTaskMutation.mutate({
        title,
        color: selectedColor,
        isCompleted: false,
      })

      router.push('/')
    } else {
      updateTaskMutation.mutate({
        ...item,
        title: title,
        color: selectedColor,
        isCompleted: false,
      })

      router.push('/')
    }
  }

  return (
    <>
      <Image
        src="/arrow-left.svg"
        alt="back"
        height="24"
        width="24"
        className="mt-20 cursor-pointer"
        onClick={() => router.push('/')}
      />

      <div className="mt-10">
        <div>
          <label htmlFor="title" className="text-sm font-bold text-[#4EA8DE]">
            Title
          </label>
        </div>

        <input
          type="text"
          id="title"
          placeholder="Ex. Brush your teeth"
          className={
            'mt-3 bg-[#262626] p-4 rounded-lg border border-[#333333] w-[100%] text-[#F2F2F2]'
          }
          value={title}
          onChange={onTitleChange}
        />
      </div>

      <div className="mt-10">
        <div>
          <label htmlFor="title" className="text-sm font-bold text-[#4EA8DE]">
            Color
          </label>
        </div>

        <div className={'flex mt-2'}>
          {COLOR_OPTIONS.map((color) => (
            <Circle
              key={color}
              color={color}
              className={`h-[52px] cursor-pointer w-[52px] mr-4 ${color === selectedColor ? 'border-2 solid' : ''}`}
              onClick={() => onColorChange(color)}
              filled
            />
          ))}
        </div>
      </div>

      {mode === 'create' ? (
        <Button
          onClick={onSubmit}
          label="Add task"
          className="mt-10"
          icon={
            <Image
              className="ml-2"
              src="/plus.svg"
              alt="Plus"
              height="16"
              width="16"
            />
          }
        />
      ) : (
        <Button
          onClick={onSubmit}
          label="Save"
          className="mt-10"
          icon={
            <Image
              className="ml-2"
              src="/check-icon.svg"
              alt="Plus"
              height="16"
              width="16"
            />
          }
        />
      )}
    </>
  )
}

export default TaskForm
