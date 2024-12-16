export type Color =
  | 'RED'
  | 'ORANGE'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'VIOLET'
  | 'PURPLE'
  | 'MAROON'
  | 'BROWN'

export type Task = {
  id: number
  title: string
  color: Color
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}

export type TaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>