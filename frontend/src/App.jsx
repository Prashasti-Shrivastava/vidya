import React from 'react'
import Todo from './components/todo/Todo'
import LearnNext from './components/learnNext/LearnNext'
import Login from './components/Auth/Login'
const App = () => {
  return (
    <div>
      <Login />
      <Todo />
      <LearnNext />
    </div>
  )
}

export default App

