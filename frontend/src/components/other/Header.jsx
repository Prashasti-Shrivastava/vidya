import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between mb-8'>
      <h1 className='text-2xl font-medium '> Hello <span className='text-3xl font-semibold'>Sarthak</span></h1>
      <button className='bg-red-500 px-3 py-2 rounded-sm text-lg font-medium text-amber-50'>Logout</button>
    </div>
  )
}

export default Header
