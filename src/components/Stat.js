import React from 'react'

export const Stat = (props) => {
  return (
    <>
      <div
        className="text-center text-2xl font-medium py-4 px-6 border shadow border-primary rounded-lg bg-light"
      >
        <p className="stat-title">{props.name}</p>
        <div className="group relative">
          <div className="truncate" title={props.name}>
            {props.amount}
          </div>
          <div className="hidden group-hover:block absolute z-10 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap left-1/2 transform -translate-x-1/2">
            {props.amount}
          </div>
        </div>

      </div>
    </>
  )
}
