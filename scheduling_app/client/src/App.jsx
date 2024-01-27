import { useState } from 'react'
import './App.css'
import Scheduler from './components/Scheduler'

function App() {

  return (
    <>
      <div className='App'>
        <h1>My Scheduling App</h1>
        <Scheduler />
      </div>
    </>
  )
}

export default App
