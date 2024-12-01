import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { PageHeading } from '../components/PageHeading'
import { PlainCategoryCard } from '../components/PlainCategoryCard'
import useDocumentTitle from './useDocumentTitle'
import { showAllCategoriesApi } from '../api/public-api'

const Category = () => {
  useDocumentTitle("Category")
  const [categories, setCategories] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    showAllCategoriesApi()
      .then(res => {
        setCategories(res.data.result)
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
        } else {
          return "No respon from server"
        }
      })
  }, [])
  return (
    <>
      <Layout>
        <div className='py-10 px-10 px-5 sm:px-5 md:px-5 lg:px-20'>
          <PageHeading headingTitle="Category" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-5">
            {categories.map((category) => (
              <PlainCategoryCard
                name={category.categoryName}
                categorySlug={category.categorySlug}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Category