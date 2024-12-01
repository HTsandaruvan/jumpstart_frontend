import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout";
import useDocumentTitle from './useDocumentTitle';
import hero from '../assets/images/hero.webp'
import { PageHeading } from '../components/PageHeading';
import { CategoryCard } from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { showAllProductsApi } from '../api/public-api';
import { Link } from 'react-router-dom';


const HomePage = () => {
  useDocumentTitle("Welcome to Jumpstart")

  const [products, setProducts] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    showAllProductsApi()
      .then(res => {
        setProducts(res.data.result)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Layout>
        <div className='flex flex-col gap-10 py-10 px-5 sm:px-10 md:px-20 lg:px-20'>
          <section>
            <img src={hero} alt="Jumpstart hero" className='rounded-md' />
          </section>
          <section>
            <PageHeading headingTitle="Category" />
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 xl:gap-1 '>
              <CategoryCard categorySlug='phones' img="https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=1934&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name='Phones & Telecommunications' />
              <CategoryCard categorySlug='womenscloths' img="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name="Women's Clothing" />
              <CategoryCard categorySlug='menscloths' img="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name="Men's Clothing" />
              <CategoryCard categorySlug='accerssories' img="https://www.garrettmotion.com/wp-content/uploads/2018/06/Garrett_Performance_Accessories-480x338.jpg" name='Accerssories' />
              <CategoryCard categorySlug='kids' img="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=2040&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name='Kids' />
              <CategoryCard categorySlug='sports' img="https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name='Sports' />
              <CategoryCard categorySlug='jewelrynWatches' img="https://images.unsplash.com/photo-1466684921455-ee202d43c1aa?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name='Jewelry and Watches' />
              <CategoryCard categorySlug='computers_and_laptops' img="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwYW5kJTIwbGFwdG9wfGVufDB8fDB8fHww" name='Computers and Laptops' />
            </div>
          </section>
          <section>
            <PageHeading headingTitle="Our Products" />
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3 xl:gap-5  '>
              {products.slice(0, 12).map((product) => (
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
            {products.length > 12 &&
              <div className='mx-auto text-center py-5'>
                <Link
                  to={"/products"}
                  className='btn btn-primary mx-auto'
                >
                  Load More
                </Link>
              </div>
            }
          </section>
        </div>
      </Layout>
    </>
  )
}

export default HomePage;