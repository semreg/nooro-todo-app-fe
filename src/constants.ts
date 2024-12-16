import { Color } from '@/types'

export const COLOR_OPTIONS: Color[] = [
  'RED',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'VIOLET',
  'PURPLE',
  'MAROON',
  'BROWN',
]

export const COLORS_MAP: Record<Color, string> = {
  RED: '#FF3B30',
  ORANGE: '#FF9500',
  YELLOW: '#FFCC00',
  GREEN: '#34C759',
  BLUE: '#007AFF',
  VIOLET: '#5856D6',
  PURPLE: '#AF52DE',
  MAROON: '#FF2D55',
  BROWN: '#A2845E',
}

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/tasks`
