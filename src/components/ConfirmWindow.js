import React from 'react'

export const ConfirmWindow = ({
  elementId,
  buttonClass,
  confirmButtonText,
  message,
  name,
  action,
  icon
}) => {
  return (
    <>
      <button
        className={buttonClass ? buttonClass : "btn"}
        onClick={() => document.getElementById(elementId).showModal()}
      >
        {icon}
      </button>
      <dialog id={elementId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="font-semibold pt-4">{message}</p>
          <p className="py-3">{name}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button type='button'
              className={buttonClass}
              // TODO: make button text customizable with use case
              onClick={action}>{confirmButtonText}</button>
          </div>
        </div>
      </dialog>
    </>
  )
}
