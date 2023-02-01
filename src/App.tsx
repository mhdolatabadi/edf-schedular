import React from 'react'
import './App.css'
import { TimeSlice } from './components/TimeSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  currentTimeView,
  executionQueueView,
  initialProcessesView,
  processesView,
  shift,
} from './redux/slice/process.slice'
import { ProcessTable } from './components/ProcessTable'
import { AddProcess } from './components/AddProcess'

function App() {
  const dispatch = useDispatch()
  const processes = useSelector(processesView)
  const initialProcesses = useSelector(initialProcessesView)
  const currentTime = useSelector(currentTimeView)
  const executionQueue = useSelector(executionQueueView)
  const isFinished = !processes.find((p) => !p.endTime)

  return (
    <div className="App">
      <div
        style={{
          fontSize: '20px',
          marginBottom: '30px',
          position: 'absolute',
          top: '30px',
        }}
      >
        Earliest Deadline-based Process Scheduling
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          boxSizing: 'border-box',
          alignItems: 'center',
        }}
      >
        <AddProcess />
        <ProcessTable />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', boxSizing: 'border-box' }}>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            height: '300px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: '100%',
            }}
          >
            <div style={{ color: 'salmon' }}>Current Time: {currentTime}</div>
            <div
              style={{
                backgroundColor: isFinished ? 'gray' : 'green',
                color: 'white',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => !isFinished && dispatch(shift())}
            >
              Next
            </div>
          </div>

          <table style={{ height: '200px' }}>
            <thead>
            <tr>
              <th>Average Response Time</th>
              <th>Average Waiting Time</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                {isFinished &&
                  (
                    processes
                      .map((p) => p.responseTime as number)
                      .reduce(
                        (partialSum: number, a: number) => partialSum + a,
                        0
                      ) / processes.length
                  ).toFixed(2)}
              </td>
              <td>
                {isFinished &&
                  (
                    processes
                      .map((p) => p.waitingTime as number)
                      .reduce(
                        (partialSum: number, a: number) => partialSum + a,
                        0
                      ) / processes.length
                  ).toFixed(2)}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            width: '710px',
            borderRadius: '3px',
            padding: '10px 30px',
            boxSizing: 'border-box',
            margin: '10px',
            height: '300px',
            color: 'salmon',
            border: '1px solid salmon'
          }}
        >
          {executionQueue.map((p) => (
            <TimeSlice
              {...p}
              isFinished={isFinished}
              final={Math.max(...(processes.map((p) => p.endTime) as number[]))}
              processes={initialProcesses}
              currentTime={currentTime}
            />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '30px'}}>
        <div style={{ marginTop: '10px', fontSize: '10px' }}>
          Operating Systems - Fall - 2022
        </div>
        <div style={{ marginTop: '10px', fontSize: '10px' }}>
          Instructor: Dr. Dadbakhsh - Implement by: Mohammadhossein Dolatabadi
        </div>
      </div>
    </div>
  )
}

export default App
