import { COLORS_MAP } from '@/constants'
import { Color } from '@/types'
import React, { CSSProperties, ReactNode, useMemo } from 'react'

type Props = {
  color: Color
  filled?: boolean
  className?: string
  onClick?: () => void
  children?: ReactNode
}

const Circle: React.FC<Props> = ({
  color,
  filled = false,
  className,
  onClick,
  children,
}) => {
  const circleStyle = useMemo((): CSSProperties => {
    const currentColor = COLORS_MAP[color]

    const style: CSSProperties = {}

    if (!filled) {
      style.border = `2px solid ${currentColor}`
    } else {
      style.backgroundColor = currentColor
    }

    return style
  }, [color, filled])

  return (
    <div
      onClick={onClick}
      className={`rounded-full flex ${className} items-center justify-center test`}
      style={circleStyle}
    >
      {children}
    </div>
  )
}

export default React.memo(Circle)
