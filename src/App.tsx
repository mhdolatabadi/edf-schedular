import React from 'react'
import './App.css'
import { TimeSlice } from './components/TimeSlice'

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <TimeSlice />
        <TimeSlice />
        <TimeSlice />
        <TimeSlice />
        <TimeSlice />
      </div>
    </div>
  )
}

export default App
