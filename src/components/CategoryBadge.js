import React from 'react'
import { Link } from 'react-router-dom'

export const CategoryBadge = (props) => {
  return (
    <span><Link to={`/products?category=${props.categorySlug}`} className="badge badge-accent inline">{props.categoryName}</Link></span>
  )
}
