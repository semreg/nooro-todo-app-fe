import Button from '@/components/Button'
import Chip from '@/components/Chip'
import TaskList from '@/components/TaskList'
import React, { useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '@/api/queries'
import Image from 'next/image'

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  const completedTasksNum = useMemo(
    () => data?.reduce((acc, curr) => (curr.isCompleted ? acc + 1 : acc), 0),
    [data]
  )

  const completedTasksLabel = useMemo(() => {
    return completedTasksNum === 0 || !completedTasksNum
      ? '0'
      : `${completedTasksNum} of ${data?.length} `
  }, [completedTasksNum, data?.length])

  return (
    <>
      <Link href="/new" className="mt-[-25px]">
        <Button
          label="Create task"
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
      </Link>

      <div className="mt-10 flex w-full justify-between text-sm font-bold">
        <div className="flex">
          <span className="text-[#4EA8DE] mr-2">Tasks</span>
          <Chip label={data?.length.toString()} />
        </div>

        <div className="flex">
          <span className="text-[#8284FA] mr-2">Completed</span>
          <Chip label={completedTasksLabel} />
        </div>
      </div>

      <TaskList isLoading={isLoading} items={data} />
    </>
  )
}

export default HomePage
