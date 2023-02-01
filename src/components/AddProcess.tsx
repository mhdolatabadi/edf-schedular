import { add, currentTimeView } from '../redux/slice/process.slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function AddProcess() {
  const dispatch = useDispatch()
  const currentTime = useSelector(currentTimeView)
  const [name, setName] = useState('')
  const [arriveTime, setArriveTime] = useState(currentTime)
  const [burstTime, setBurstTime] = useState(0)
  const [deadline, setDeadline] = useState(currentTime)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        height: '200px',
        justifyContent: 'space-between',
        color: '#ffc2b0',
      }}
    >
      <div style={{ color: 'salmon'}}>Add Process</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="arrive-time">Arrive Time</label>
        <input
          name="arrive-time"
          id="arrive-time"
          value={arriveTime}
          onChange={(e) => setArriveTime(+e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="burst-time">Burst Time</label>
        <input
          name="burst-time"
          id="burst-time"
          value={burstTime}
          onChange={(e) => setBurstTime(+e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="deadline">Deadline</label>
        <input
          name="deadline"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(+e.target.value)}
        />
      </div>
      <div>
        <div
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            boxSizing: 'border-box',
            borderRadius: '10px',
          }}
          onClick={() =>
            dispatch(
              add({ name, executionTime: burstTime, deadline, arriveTime })
            )
          }
        >
          Add
        </div>
      </div>
    </div>
  )
}
