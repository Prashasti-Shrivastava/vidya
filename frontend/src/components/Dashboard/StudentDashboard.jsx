import React from 'react'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../taskList/TaskList'
const StudentDashboard = () => {
  return (
   <div className='p-10 h-screen '>
    <Header />
    <TaskListNumber />
    <TaskList />
   </div>
  )
}

export default StudentDashboard
