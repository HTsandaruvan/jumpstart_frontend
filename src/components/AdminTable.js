import React from 'react'

export const AdminTable = (props) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {props.children}
        </table>
      </div>
    </>
  )
}
