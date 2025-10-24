import React from 'react'

const SimpleChart = () => {
  const data = [65, 59, 80, 81, 56, 55, 40, 75, 60, 85, 70, 90]

  return (
    <div className="simple-chart">
      {data.map((value, index) => (
        <div 
          key={index}
          className="chart-bar"
          style={{ height: `${value}%` }}
          title={`Value: ${value}`}
        />
      ))}
    </div>
  )
}

export default SimpleChart