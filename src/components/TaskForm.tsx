import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Circle from '@/components/Circle'
import Button from '@/components/Button'
import { Color, Task, TaskFormData } from '@/types'
import { COLOR_OPTIONS } from '@/constants'

type Props = {
  mode: 'create' | 'edit'
  item?: Partial<Task>
  onSubmit: (formData: TaskFormData) => void
}

const TaskForm: React.FC<Props> = ({ mode, item, onSubmit }) => {
  const router = useRouter()

  const [title, setTitle] = useState<string>(item?.title || '')
  const [selectedColor, setSelectedColor] = useState<Color>(
    item?.color || 'RED'
  )

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      return
    }

    onSubmit({
      title,
      color: selectedColor,
    })

    router.push('/')
  }

  const isFormValid = useMemo(() => title.trim().length > 0, [title])

  return (
    <div>
      <Image
        src="/arrow-left.svg"
        alt="Back"
        height={24}
        width={24}
        className="mt-20 cursor-pointer"
        onClick={() => router.push('/')}
      />

      <div className="mt-10">
        <label htmlFor="title" className="text-sm font-bold text-[#4EA8DE]">
          Title
        </label>

        <input
          autoFocus
          type="text"
          id="title"
          placeholder="Ex. Brush your teeth"
          className="mt-3 bg-[#262626] p-4 rounded-lg border border-[#333333] w-full text-[#F2F2F2]"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="mt-10">
        <label className="text-sm font-bold text-[#4EA8DE]">Color</label>

        <div className="flex flex-wrap mt-2 gap-2">
          {COLOR_OPTIONS.map((color) => (
            <Circle
              key={color}
              color={color}
              className={`h-[52px] w-[52px] mr-4 cursor-pointer ${
                color === selectedColor ? 'border-2 border-solid' : ''
              }`}
              onClick={() => setSelectedColor(color)}
              filled
            />
          ))}
        </div>
      </div>

      <Button
        disabled={!isFormValid}
        title={!isFormValid ? 'Title is required' : undefined}
        onClick={handleSubmit}
        label={mode === 'create' ? 'Create' : 'Save'}
        className="mt-10"
        icon={
          <Image
            className="ml-2"
            src={mode === 'create' ? '/plus.svg' : '/check-icon.svg'}
            alt={mode === 'create' ? 'Plus' : 'Check'}
            height={16}
            width={16}
          />
        }
      />
    </div>
  )
}

export default TaskForm
