import React from 'react'
import { Link } from 'react-router-dom'

export const CategoryCard = (props) => {
  return (
    <Link to={`/products?category=${props.categorySlug}`}>
      <div class="card-container">
        <a href="/" class="hero-image-container">
          <img class="hero-image" />
          <div
            className="flex justify-center items-center text-white text-2xl font-medium py-4 px-6 border rounded-lg bg-light h-28 sm:h-28 md:h-32 lg:h-40"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <p className="">{props.name}</p>
          </div>
        </a>
      </div>
    </Link>

  )
}
