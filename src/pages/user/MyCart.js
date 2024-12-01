import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { PageHeading } from '../../components/PageHeading'
import { ItemCard } from '../../components/ItemCard'
import useDocumentTitle from '../useDocumentTitle'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useRedirectUser } from '../../hooks/redirectUser'
import { Link, useNavigate } from 'react-router-dom'
import { getMyCart, getMyCartApi } from '../../api/user-api'
import empty from '../../assets/images/empty.svg'
import { createPaymentApi, mantap } from '../../api/transaction-api'

export const MyCart = () => {
  useDocumentTitle("My Shopping Cart")

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  const [cart, setCart] = useState({})
  const [items, setitems] = useState([])
  const [itemNumbers, setItemNumbers] = useState(0)

  const [isCartUpdated, setCartUpdated] = useState(false)
  useEffect(() => {
    if (isLogin() && isAdmin) {
      redirectUser(role)
    }
  })

  useEffect(() => {
    if (isCartUpdated === true) {
      window.scrollTo(0, 0)
    }
    getMyCartApi(token)
      .then(res => {
        setCart(res.data.result)
        setitems(res.data.result.items)
      })
      .catch(error => {
        console.log(error)
      })
    setCartUpdated(false)
  }, [token, isCartUpdated])

  const [isCheckoutBtnLoading, setCheckoutBtnLoading] = useState(false)

  const handlePayment = () => {
    setCheckoutBtnLoading(true)
    createPaymentApi(token)
      .then(res => {
        const paymentUrl = res.data.result
        window.location.href = paymentUrl
        setCheckoutBtnLoading(false)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const Cart = () => {
    return (
      <div className='py-10 flex flex-wrap flex-col sm:flex sm:flex-wrap sm:flex-col gap-y-5 sm:gap-y-5 md:gap-y-5 lg:gap-y-5 md:grid md:grid-cols-12 px-5 sm:px-5 md:px-44 lg:px-20'>
        <div className='mx-5 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 bg-white'>
          <PageHeading headingTitle='My shopping cart' />
          <div className='flex flex-col gap-5'>
            {items.map((item) => (
              <ItemCard
                key={item.itemId}
                extraAction={{ setCartUpdated }}
                product={item.product}
                itemId={item.itemId}
                productName={item.product.productName}
                slug={item.product.slug}
                image={item.product.image}
                categoryName={item.product.category.categoryName}
                quantity={item.quantity}
                price={item.product.price}
                itemPriceTotal={item.itemPriceTotal}
              />
            ))}

          </div>
        </div>
        <div className='mx-5 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3'>
          <div className="fixed bottom-0 left-0 right-0 z-10 lg:static bg-white flex flex-col gap-3 border shadow rounded px-10 lg:px-5 py-5">
            <div className='text-lg font-semibold'>Order summary</div>
            {cart && cart.total !== undefined ? (
              <>
                <div>Total items: {cart.itemNumbers}</div>
                <div>Total amount: ${cart.total?.toLocaleString("en-US")}</div>
              </>
            ) : (
              <div>Loading...</div>
            )}
            <button
              type='button'
              onClick={() => handlePayment()}
              disabled={isCheckoutBtnLoading}
              className='btn btn-primary w-full'>{!isCheckoutBtnLoading ? "Checkout" : "Loading..."}</button>
          </div>
        </div>
      </div>
    )
  }

  const EmptyCartView = () => {
    return (
      <div className='py-10 px-10 sm:px-10 md:px-40 lg:px-72' >
        <div className='text-center'>
          <PageHeading headingTitle="Your cart is empty" />
          <Link to={'/products'} className='btn btn-primary mb-10'>See products</Link>
          <img src={empty} alt="url not found illustration" className='mx-auto h-96' />
        </div>
      </div >
    )
  }

  return (
    <>
      <Layout>
        {
          items.length !== 0 ?
            (<Cart />) : (<EmptyCartView />)
        }
      </Layout>
    </>
  )
}
