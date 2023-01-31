import {
  initialProcessesView,
  processesView,
} from '../redux/slice/process.slice'
import React from 'react'
import { useSelector } from 'react-redux'

export function ProcessTable() {
  const initialProcesses = useSelector(initialProcessesView)
  const processes = useSelector(processesView)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Arrive Time</th>
          <th>Burst Time</th>
          <th>Deadline</th>
          <th>Final Time</th>
          <th>Response Time</th>
          <th>Waiting Time</th>
        </tr>
      </thead>
      <tbody>
        {processes.map(
          ({
            name,
            arriveTime,
            deadline,
            endTime,
            responseTime,
            waitingTime,
          }) => (
            <tr>
              <td>{name}</td>
              <td>{arriveTime}</td>
              <td>
                {initialProcesses.find((p) => p.name === name)?.executionTime}
              </td>
              <td>{deadline}</td>
              <td>{endTime}</td>
              <td>{responseTime}</td>
              <td>{waitingTime}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
