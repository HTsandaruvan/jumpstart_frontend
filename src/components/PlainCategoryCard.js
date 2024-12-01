import React from 'react'
import { Link } from 'react-router-dom'

export const PlainCategoryCard = (props) => {
  return (
    <>
      <Link to={`/products?category=${props.categorySlug}`}
        className="text-center text-2xl font-medium py-4 px-6 border shadow hover:bg-sky-500 hover:text-white transition-all border-primary rounded-lg bg-light"
      >{props.name}
      </Link>
    </>
  )
}
