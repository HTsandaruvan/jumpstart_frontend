import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';
import useDocumentTitle from './useDocumentTitle';
import { searchForProductsApi, showAllCategoriesApi, showAllProductsApi } from '../api/public-api';
import { useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
  useDocumentTitle("Products")
  const queryParameters = new URLSearchParams(window.location.search)
  const searchParam = queryParameters.get("q")
  const categoryParam = queryParameters.get("category")
  const navigate = useNavigate()
  const location = useLocation()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [fullParam, setFullParam] = useState("")

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

    searchForProductsApi(categoryParam, searchParam)
      .then(res => {
        setProducts(res.data.result.searchResults)
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
        } else {
          return "No respon from server"
        }
      })
  }, [location, category, searchParam])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    if (searchParam === null) navigate(`/products?category=${e.target.value}`)
    if (searchParam !== null) {
      navigate(`/products?category=${e.target.value}&q=${searchParam}`)
      setFullParam(`/products?category=${e.target.value}&q=${searchParam}`)
    } if (searchParam === "" && category !== null) {
      navigate(`/products?category=${e.target.value}`)
      setFullParam(`/products?category=${e.target.value}`)
    } if (searchParam === "" && category === null) {
      navigate(`/products`)
      setFullParam(`/products`)
    }
  }
  return (
    <>
      <Layout>
        <div className='py-10 grid grid-cols-12 px-5 sm:px-5 md:px-5 lg:px-20'>
          <div className='mx-5 col-span-12 sm:col-span-12 md:col-span-12 lg:block lg:col-span-3'>
            <h1 className="text-lg font-semibold mb-2">Filter</h1>
            <div className='border shadow rounded p-5 overflow-x-auto'>
              <div className='flex sm:flex md:flex lg:flex-col gap-3'>
                <select onChange={(e) => handleCategoryChange(e)} className="select select-bordered max-w-xs sm:w-full sm:max-w-xs md:w-full md:max-w-xs lg:w-full lg:max-w-xs">
                  <option disabled selected value={0}>Choose category</option>
                  {categories.length !== 0 && categories.map((category) => (
                    <option
                      value={category?.categorySlug}
                      key={category?.categoryId}
                      selected={category?.categorySlug === categoryParam}
                    >
                      {category.categoryName}
                    </option>
                  )
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className='mx-5 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9'>
            <div className='lg:hidden overflow-x-auto mb-5'>
              <div className='flex gap-3'>

              </div>
            </div>
            <div className='grid xs:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5'>
              {products.map((product) => (
                <ProductCard
                  key={product.productId}
                  productId={product.productId}
                  image={product.image}
                  slug={product.slug}
                  productName={product.productName}
                  category={product.category}
                  price={product.price}
                  oldPrice={product.oldPrice}
                />
              )
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Products;