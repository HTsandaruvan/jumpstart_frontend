import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { date } from 'yup';

const Product = ({
  slug,
  productName,
  quantity,
  price,
  image
}) => {
  return (
    <div div className='flex gap-3' >
      <Link to={`/p/snapshot/${slug}`} className='aspect-square border rounded'>
        {image ?
          (<img
            src={`data:image/jpeg;base64,${image}`}
            alt="product thumbnail"
            className="object-contain w-20 h-full rounded" />) :
          (<img
            src="https://static.vecteezy.com/system/resources/previews/004/745/297/non_2x/3d-isometric-paper-shopping-bag-in-circle-icon-shopping-bag-for-advertising-and-branding-collection-for-retail-design-for-web-page-ui-mobile-illustration-for-products-and-things-free-vector.jpg"
            alt="product thumbnail"
            className="object-contain w-20 h-full rounded" />)
        }
      </Link>
      <div>
        <Link to={`/p/snapshot/${slug}`} className='text-lg font-medium'>{productName}</Link>
        <div>{quantity} * ${price} = ${quantity * price}</div>
        <div></div>
      </div>
    </div >
  );
}

export const handleStatusText = (status) => {
  switch (status) {
    case "PENDING":
      return {
        status: status,
        color: "font-semibold text-yellow-500"
      }
    case "COMPLETED":
      return {
        status: status,
        color: "font-semibold text-green-500"
      }
    case "CANCELLED":
      return {
        status: status,
        color: "font-semibold text-red-500"
      }
    default:
      return {
        status: status,
        color: "font-semibold text-black"
      }
  }
}

export const OrderCard = ({
  orderId,
  status,
  date,
  total,
  productSnapshots,
}) => {

  const [snapshots, setSnapshots] = useState([])

  useEffect(() => {
    setSnapshots(productSnapshots)
  }, [productSnapshots])

  return (
    <>
      <div className='p-4 bg-white border rounded shadow'>
        <div className='mb-3'>
          <div className='text-lg font-semibold'>Order ID: {orderId}</div>
          <div>{date} |
            <span className={`${handleStatusText(status).color}`}> {handleStatusText(status).status}</span>
          </div>
        </div>
        <div className='flex flex-col gap-4 mb-3'>
          {snapshots && snapshots.map((snapshot) => (
            <Product
              key={snapshot.id}
              slug={snapshot.slug}
              productName={snapshot.productName}
              quantity={snapshot.quantity}
              price={snapshot.price}
              image={snapshot.image}
            />
          ))}
        </div>

        <div>Total amount:</div>
        <div className='text-3xl font-semibold text-primary'>${total}</div>
      </div>
    </>
  )
}
