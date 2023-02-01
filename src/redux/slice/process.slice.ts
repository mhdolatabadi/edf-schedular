import { createSlice } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { RootState } from '../store'

export interface Process {
  name: string
  arriveTime: number
  executionTime: number
  deadline: number
  endTime?: number
  responseTime?: number
  waitingTime?: number
}

const processSlice = createSlice({
  name: 'process',
  initialState: {
    currentTime: 0,
    initialProcess: [
      { name: 'A1', arriveTime: 0, executionTime: 10, deadline: 20 },
      { name: 'A2', arriveTime: 20, executionTime: 10, deadline: 40 },
      { name: 'A3', arriveTime: 40, executionTime: 10, deadline: 60 },
      { name: 'A4', arriveTime: 60, executionTime: 10, deadline: 80 },
      { name: 'A5', arriveTime: 80, executionTime: 10, deadline: 100 },
      { name: 'B1', arriveTime: 0, executionTime: 25, deadline: 50 },
      { name: 'B2', arriveTime: 50, executionTime: 25, deadline: 100 },
    ] as Process[],
    processes: [
      { name: 'A1', arriveTime: 0, executionTime: 10, deadline: 20 },
      { name: 'A2', arriveTime: 20, executionTime: 10, deadline: 40 },
      { name: 'A3', arriveTime: 40, executionTime: 10, deadline: 60 },
      { name: 'A4', arriveTime: 60, executionTime: 10, deadline: 80 },
      { name: 'A5', arriveTime: 80, executionTime: 10, deadline: 100 },
      { name: 'B1', arriveTime: 0, executionTime: 25, deadline: 50 },
      { name: 'B2', arriveTime: 50, executionTime: 25, deadline: 100 },
    ] as Process[],
    execution: [] as { startTime: number; endTime: number; name: string, queue:  { name: string; deadline: number, executionTime: number }[], deadlineReached?: boolean}[],
  },
  reducers: {
    shift(state) {
      const startTime = state.currentTime
      let processes = state.processes.filter((p) => !p.endTime)
      const queue = processes.filter((p) => p.arriveTime <= state.currentTime)
      const processQueue = queue.map(({ name, deadline, executionTime }) => ({ name, deadline, executionTime }))
      const minDeadline = Math.min(...queue.map(({ deadline }) => deadline))
      let currentProcess = R.sortBy(
        R.prop('arriveTime'),
        processes.filter(
          (p) => p.arriveTime <= state.currentTime && p.deadline === minDeadline
        )
      )[0]
      const nextArriveTime =
        R.sort(
          (a, b) => a.arriveTime - b.arriveTime,
          processes.filter((p) => p.arriveTime > state.currentTime)
        )[0]?.arriveTime ?? Infinity
      console.log(nextArriveTime)
      if (nextArriveTime < state.currentTime + currentProcess.executionTime) {
        currentProcess.executionTime -= nextArriveTime - state.currentTime
        state.currentTime += nextArriveTime - state.currentTime
        state.execution.push({
          startTime,
          endTime: state.currentTime,
          name: currentProcess.name,
          queue: processQueue
        })
      } else {
        if (
          currentProcess.deadline <
          state.currentTime + currentProcess.executionTime
        ) {
          state.currentTime += currentProcess.deadline - state.currentTime
          state.execution.push({
            startTime,
            endTime: currentProcess.deadline,
            name: currentProcess.name,
            queue: processQueue,
            deadlineReached: true
          })
        } else {
          state.currentTime += currentProcess.executionTime
          state.execution.push({
            startTime,
            endTime: state.currentTime,
            name: currentProcess.name,
            queue: processQueue
          })
        }
        currentProcess = {
          ...currentProcess,
          endTime: state.currentTime,
          responseTime: state.currentTime - currentProcess.arriveTime,
          waitingTime:
            state.currentTime -
            currentProcess.arriveTime -
            currentProcess.executionTime,
        }
      }

      processes = processes.map((p1) =>
        currentProcess.name === p1.name ? currentProcess : p1
      )
      const final = [
        ...R.sortBy(
          R.prop('deadline'),
          processes.filter((p) => p.arriveTime <= state.currentTime)
        ),
        ...processes.filter((p) => p.arriveTime > state.currentTime),
      ]
      state.processes = state.processes.map(
        (p1) => final.find((p2) => p1.name === p2.name) ?? p1
      )
      console.table(
        state.initialProcess.map((p) => ({
          name: p.name,
          arrive: p.arriveTime,
          execution: p.executionTime,
          deadline: p.deadline,
          endTime: p.endTime,
        }))
      )
    },
    add(state, action){
      state.initialProcess.push(action.payload)
      state.processes.push(action.payload)
    }
  },
})

export const { shift, add } = processSlice.actions
export const processesSlice = processSlice.reducer
export const initialProcessesView = (state: RootState) =>
  state.initialProcess.initialProcess
export const processesView = (state: RootState) =>
  state.initialProcess.processes
export const currentTimeView = (state: RootState) =>
  state.initialProcess.currentTime

export const executionQueueView = (state: RootState) =>
  state.initialProcess.execution
