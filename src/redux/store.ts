import { configureStore } from '@reduxjs/toolkit'
import { processesSlice } from './slice/process.slice'

export const store = configureStore({
  reducer: {
    initialProcess: processesSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export const { dispatch, getState } = store
