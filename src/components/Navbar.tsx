import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="flex items-center justify-center h-[200px] bg-[black]">
      <div className="p-4 flex">
        <Image src="/rocket.svg" alt="rocket" height="16" width="23" />
        <div className="text-[40px] font-black logo ml-2">
          <span className="text-[#4EA8DE]">Todo</span>
          <span className="text-[#5E60CE] ml-2">App</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
