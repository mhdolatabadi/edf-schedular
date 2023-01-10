export function TimeSlice() {
  return (
    <div
      style={{
        width: '100px',
        height: '110px',
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
        }}
      >
        32
      </div>
      <div
        style={{
          width: '100px',
          height: '100px',
          display: 'grid',
          alignItems: 'center',
          border: '2px solid black',
          borderWidth: '2px 0 2px 2px'
        }}
      >
        P1
      </div>
    </div>
  )
}
