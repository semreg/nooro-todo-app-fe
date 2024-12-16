import React from 'react'

type Props = {
  label?: string
}

const Chip: React.FC<Props> = ({ label }) => (
  <div className="px-2 h-[21px] text-center bg-[#333333] rounded-xl">
    {label}
  </div>
)

export default Chip
