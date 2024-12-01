import React, { useState } from 'react'
import { CategoryBadge } from './CategoryBadge'
import { TrashIcon } from '../assets/SvgIcons'
import { Link, useNavigate } from 'react-router-dom'
import { addProductToCartApi, deleteCartItemByIdApi } from '../api/user-api'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'

export const ItemCard = (props) => {
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()

  const [alertMessage, setAlertMessage] = useState(null)

  const handleDeleteCartItem = (itemId) => {
    deleteCartItemByIdApi(token, itemId)
      .then(res => {
        console.log(res)
        props.extraAction.setCartUpdated()
      })
      .catch(error => {
        if (typeof error === "string") {
          console.log("Error message: " + error)
        } else {
          if (error?.response?.data) {
            // error message from backend
            setAlertMessage(
              {
                messageType: "error",
                message: error?.response?.data.message
              }
            )
          } else if (error) {
            // error message from client
            setAlertMessage(
              {
                messageType: "error",
                message: error.message
              }
            )
          } else {
            setAlertMessage(
              {
                messageType: "error",
                message: "No response from server"
              }
            )
          }
          setTimeout(() => {
            setAlertMessage(null)
          }, 3000)
        }
      })
  }

  const [productNumber, setProductNumber] = useState(props.quantity)
  const isIncrementButtonDisabled = productNumber === props.product.stock ? true : false
  const isDecrementButtonDisabled = productNumber === 1 ? true : false

  const handleProductNumber = (counter) => {
    if (counter === "+") {
      setProductNumber((prev) => (prev + 1 > props.product.stock ? prev : prev + 1))
      handleUpdateItemNumberChange(token, {
        productId: props.product.productId,
        quantity: productNumber + 1,
        requestFrom: "FROM_CART"
      })
    }
    else {
      setProductNumber((prev) => (prev - 1 === 0 ? 1 : prev - 1))
      handleUpdateItemNumberChange(token, {
        productId: props.product.productId,
        quantity: productNumber - 1,
        requestFrom: "FROM_CART"
      })
    }
  }
  const handleUpdateItemNumberChange = (token, request) => {
    addProductToCartApi(token, request)
      .then(res => {
        console.log(res)
        props.extraAction.setCartUpdated()
      })
      .catch(error => {
        if (error?.response?.data) {
          // error message from backend
          setAlertMessage(
            {
              messageType: "error",
              message: error?.response?.data.message
            }
          )
        } else if (error) {
          // error message from client
          setAlertMessage(
            {
              messageType: "error",
              message: error.message
            }
          )
        } else {
          setAlertMessage(
            {
              messageType: "error",
              message: "No response from server"
            }
          )
        }
        setTimeout(() => {
          setAlertMessage(null)
        }, 3000)
      })
  }

  const handleInputProductNumberChange = (e) => {
    const newProductNumber = Number(e.target.value);
    setProductNumber(newProductNumber)

    if (newProductNumber > props.product.stock) {
      // If it does, set it to the stock value
      setProductNumber(productNumber);
    } else if (newProductNumber <= 0) {
      // Check if it's less than or equal to zero, set it to 1
      setProductNumber(1);
    } else {
      // Otherwise, set it to the user's input
      setProductNumber(newProductNumber);
    }

    if (newProductNumber > 0 && newProductNumber <= props.product.stock) {
      handleUpdateItemNumberChange(token, {
        productId: props.product.productId,
        quantity: newProductNumber,
        requestFrom: "FROM_CART"
      })
    }
  }

  useState(() => {
    // console.log("use" + productNumber)
  }, [productNumber])

  const stockValidation = (productNumber <= 0 || productNumber > props.product.stock) ? true : false
  return (
    <>
      <div className='flex flex-col gap-4 rounded border p-5'>
        <div className='flex gap-4'>
          <div className="w-20 h-20 aspect-square bg-white border rounded overflow-hidden">
            <Link to={`/p/${props.slug}`}>
              {props?.image ?
                (<img
                  src={`data:image/jpeg;base64,${props?.image}`}
                  alt="product thumbnail"
                  className="object-contain w-full h-full rounded" />) :
                (<img src="https://static.vecteezy.com/system/resources/previews/004/745/297/non_2x/3d-isometric-paper-shopping-bag-in-circle-icon-shopping-bag-for-advertising-and-branding-collection-for-retail-design-for-web-page-ui-mobile-illustration-for-products-and-things-free-vector.jpg" alt="product thumbnail" className="object-contain w-full h-full rounded" />)
              }
            </Link>
          </div>
          <div>
            <Link to={`/p/${props.slug}`} className="font-bold text-lg"><div>{props.productName}</div></Link>
            <CategoryBadge categoryName={props.categoryName} />
            <div className="">Price: ${props.price.toLocaleString("en-US")}</div>
            <div className="font-semibold text-lg">Total Price: ${props.itemPriceTotal.toLocaleString("en-US")}</div>
          </div>
        </div>
        <div className='flex items-center gap-4 justify-end'>
          <button
            type='button'
            onClick={() => handleDeleteCartItem(props.itemId)}
            className='text-gray-500'>
            <TrashIcon />
          </button>
          <div className="join">
            <button
              type="button"
              className="btn join-item"
              disabled={isDecrementButtonDisabled}
              onClick={() => handleProductNumber("-")}>-</button>
            <input
              type="number"
              className="join-item mx-2 w-20 border text-center"
              value={productNumber === 0 ? setProductNumber(1) : productNumber}
              onChange={(e) => handleInputProductNumberChange(e)}
            // onInput={(e) => setProductNumber(Number(e.target.value))}
            />
            <button
              type="button"
              className="btn join-item"
              disabled={isIncrementButtonDisabled}
              onClick={() => handleProductNumber("+")}>+</button>
          </div>
        </div>
      </div >
    </>
  )
}
