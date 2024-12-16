import React, { JSX } from 'react'
import Image from 'next/image'

type Props = {
  label: string
  className?: string
  onClick?: () => void
  color?: string
  icon?: JSX.Element
}

const Button: React.FC<Props> = ({
  label,
  className,
  onClick,
  color = '#1E6F9F',
  icon,
}) => (
  <button
    onClick={onClick}
    className={`rounded-md w-full h-[52px] bg-[${color}] text-sm font-bold flex justify-center items-center ${className}`}
  >
    <span>{label}</span>

    {icon}
  </button>
)

export default Button
