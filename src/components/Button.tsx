import React, { ReactNode } from 'react'

/**
 * Props for the Button component.
 */
type Props = {
  /**
   * The label text displayed on the button.
   */
  label: string

  /**
   * Optional title attribute for the button element.
   */
  title?: string

  /**
   * Additional custom CSS class names to apply to the button.
   */
  className?: string

  /**
   * Optional click handler for the button.
   */
  onClick?: () => void

  /**
   * Optional JSX element for an icon to display inside the button.
   */
  icon?: ReactNode

  /**
   * Flag to indicate whether the button is disabled. Defaults to `false`.
   */
  disabled?: boolean
}

/**
 * A customizable button component.
 */
const Button: React.FC<Props> = ({
  label,
  title,
  className = '',
  onClick,
  icon,
  disabled = false,
}) => (
  <button
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={`
        rounded-md w-full h-[52px] 
        bg-[#1E6F9F] text-sm font-bold 
        flex justify-center items-center 
        disabled:opacity-50 
        ${className}`.trim()}
  >
    <span className="mr-2">{label}</span>
    {icon}
  </button>
)

export default Button
