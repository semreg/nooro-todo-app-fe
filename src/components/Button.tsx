import React, { JSX } from 'react'

type Props = {
  label: string
  className?: string
  onClick?: () => void
  color?: string
  icon?: JSX.Element
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  label,
  className,
  onClick,
  icon,
  disabled = false,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`rounded-md w-full h-[52px] bg-[#1E6F9F] text-sm font-bold flex justify-center items-center disabled:opacity-50 ${className}`}
  >
    <span>{label}</span>

    {icon}
  </button>
)

export default Button
