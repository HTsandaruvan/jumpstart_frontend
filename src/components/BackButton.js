import React from 'react'
import { Link } from 'react-router-dom'
import { BackIcon } from '../assets/SvgIcons'

export const BackButton = (props) => {
  return (
    <Link to={props.to} className='btn btn-ghost'><BackIcon /></Link>
  )
}
