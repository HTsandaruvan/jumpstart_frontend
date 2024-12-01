import React, { useEffect, useState } from 'react'
import UserLayout from '../../components/user/layout/UserLayout';
import { PageHeading } from '../../components/PageHeading';
import { Link, useNavigate } from 'react-router-dom';
import { OrderCard } from '../../components/OrderCard';
import useDocumentTitle from '../useDocumentTitle';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useRedirectUser } from '../../hooks/redirectUser';
import { getMyOrdersApi } from '../../api/user-api';
import { formatDate } from '../../utils/utils';

const MyOrders = () => {
  useDocumentTitle("Order History")

  const queryParameters = new URLSearchParams(window.location.search)
  const filter = queryParameters.get("filter")

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  const [orders, setOrders] = useState([])
  const [orderBy, setOrderBy] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
    if (isLogin() && isAdmin) {
      redirectUser(role)
    }
    getMyOrdersApi(token, filter, orderBy)
      .then(res => {
        setOrders(res.data.result.orders)
      }
      )
      .catch(err => {
        console.log(err)
      })
  }, [token, filter, orderBy])

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value)
  }



  return (
    <UserLayout>
      <PageHeading headingTitle='Order history' />
      <div className='flex gap-3 overflow-x-auto mb-2'>
        <select
          onChange={(e) => handleOrderChange(e)}
          className='select select-bordered max-w-xs'
        >
          <option disabled value="">Order by</option>
          <option selected value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
        <ul className='flex gap-3'>
          <li><Link to={"/user/orders"} className='btn btn-outline btn-primary'>All orders</Link></li>
          <li><Link to={"/user/orders?filter=pending"} className='btn btn-outline btn-primary'>Pending</Link></li>
          <li><Link to={"/user/orders?filter=completed"} className='btn btn-outline btn-primary'>Completed</Link></li>
          <li><Link to={"/user/orders?filter=cancelled"} className='btn btn-outline btn-primary'>Cancelled</Link></li>
        </ul>
      </div>

      <div className='flex flex-col gap-4'>
        {orders.length === 0 && <span>There isn't any order in this filter</span>}
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            orderId={order.orderId}
            status={order.status}
            date={formatDate(order.createdAt)}
            total={order.total}
            productSnapshots={order.productSnapshots}
          />
        ))}
      </div>
    </UserLayout>
  )
}

export default MyOrders;