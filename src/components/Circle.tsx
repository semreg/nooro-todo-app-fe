import { COLORS_MAP } from '@/constants'
import { Color } from '@/types'
import { CSSProperties, JSX, useMemo } from 'react'

type Props = {
  color: Color
  filled?: boolean
  className?: string
  onClick?: () => void
  children?: JSX.Element
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
      className={`rounded-full ${className} flex align-center justify-center`}
      style={circleStyle}
    >
      {children}
    </div>
  )
}

export default Circle
