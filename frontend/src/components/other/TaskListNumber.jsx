import React from 'react'

const TaskListNumber = () => {
  return (
    <div className='flex screen justify-between gap-5'>
      <div className=' w-[45%] bg-red-300 py-4 px-8 rounded-xl'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>

      <div className=' w-[45%] bg-purple-300 py-4 px-8 rounded-xl'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>

      <div className=' w-[45%] bg-green-300 py-4 px-8 rounded-xl'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>

      <div className=' w-[45%] bg-amber-300 py-4 px-8 rounded-xl'>
        <h2 className='text-3xl font-semibold'>0</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber
