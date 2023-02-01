import * as R from 'ramda'
import { Process } from '../redux/slice/process.slice'

interface Props {
  startTime: number
  endTime: number
  name: string
  isFinished?: boolean
  final?: number
  queue: { name: string; executionTime: number; deadline: number }[]
  deadlineReached?: boolean
  currentTime: number
  processes: Process[]
}

export function TimeSlice({
  startTime,
  endTime,
  name,
  isFinished,
  final,
  queue,
  deadlineReached,
  processes,
}: Props) {
  const finish = isFinished && final === endTime
  const processDeadline = processes
    .filter((p) => p.deadline === endTime)
    .map(({ name }) => name)
  return (
    <div
      style={{
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '20px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>{startTime}</div>
        {finish && <div>{endTime}</div>}
      </div>
      <div
        style={{
          width: '100px',
          height: '40px',
          display: 'grid',
          alignItems: 'center',
          border: '2px solid black',
          borderWidth: finish ? '2px' : '2px 0 2px 2px',
          backgroundColor: '#ffc2b0',
          color: 'black'
        }}
      >
        {name}
      </div>
      <div
        style={{
          marginTop: '5px',
          width: 'auto',
          height: '100px',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        {R.sortBy(R.prop('executionTime'), queue).map(
          ({ name: pname, executionTime, deadline }) => (
            <div
              style={{
                border: pname === name ? '2px solid pink' : 'none',
                padding: '5px',
                boxSizing: 'border-box',
                borderRadius: '10px'
              }}
            >{`${pname}(${executionTime}, ${deadline})`}</div>
          )
        )}
      </div>

      <div
        style={{
          width: '100px',
          height: 'auto',
          borderWidth: finish ? '2px' : '2px 0 2px 2px',
        }}
      >
        {(deadlineReached || processDeadline.length > 0) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}
          >
            <div style={{ fontSize: '50px' }}>↓</div>
            {deadlineReached ? (
              <>
                <div style={{ color: 'red' }}>✘</div>
                <div>{name}</div>
              </>
            ) : (
              processDeadline.map((p) => (
                <div style={{ display: 'flex'}}>
                  <div>{p}</div>
                  <div style={{ color: 'green' }}>✔</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
