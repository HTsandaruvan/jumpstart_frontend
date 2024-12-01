import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/layout/AdminLayout'
import { PageHeading } from '../../components/PageHeading'
import useDocumentTitle from '../useDocumentTitle'
import { CheckIcon, CrossIcon, EyeIcon } from '../../assets/SvgIcons'
import { Link, useNavigate } from 'react-router-dom'
import { AdminTable } from '../../components/AdminTable'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useRedirectUser } from '../../hooks/redirectUser'
import { ConfirmWindow } from '../../components/ConfirmWindow'
import { cancelOrderApi, completeOrderApi, getOrdersApi } from '../../api/admin-api'
import { detailFormatDate, formatDate } from '../../utils/utils'
import { OrderCard, handleStatusText } from '../../components/OrderCard'
import { AlertMessage } from '../../components/AlertMessage'

const OrderManagement = () => {
  useDocumentTitle('Order Management')
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

  const [isUpdated, setUpdated] = useState(false)
  const [orders, setOrders] = useState([])

  const [orderBy, setOrderBy] = useState("")

  useEffect(() => {
    setUpdated(false)
    window.scrollTo(0, 0)
    getOrdersApi(token, filter, orderBy)
      .then(res => {
        setOrders(res.data.result.orders)
      })
      .catch(err => {
        console.log(err)
      })

  }, [filter, isUpdated, orderBy])

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value)
  }

  const orderManagementNavigation = [
    {
      name: "All orders",
      path: "/admin/orders"
    },
    {
      name: "Pending",
      path: "/admin/orders?filter=pending"
    },
    {
      name: "Completed",
      path: "/admin/orders?filter=completed"
    },
    {
      name: "Cancelled",
      path: "/admin/orders?filter=cancelled"
    },
  ]
  const [alertMessage, setAlertMessage] = useState(null)
  const handleCompleteOrder = (orderId) => {
    completeOrderApi(token, orderId)
      .then(res => {
        setUpdated(true)
        console.log(res)
        setAlertMessage({
          messageType: "success",
          message: res.data.message
        })
        setTimeout(() => {
          setAlertMessage(null)
        }, 3000)
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
          if (error.status) {
            navigate("/login")
          }
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

  const handleCancelOrder = (orderId) => {
    cancelOrderApi(token, orderId)
      .then(res => {
        setUpdated(true)
        console.log(res)
        setAlertMessage({
          messageType: "success",
          message: res.data.message
        })
        setTimeout(() => {
          setAlertMessage(null)
        }, 3000)
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
          if (error.status) {
            navigate("/login")
          }
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


  return (
    <>
      <AdminLayout>
        <PageHeading headingTitle='Order Management' />
        {alertMessage &&
          <div className='mb-4'>
            <AlertMessage messageType={alertMessage.messageType} message={alertMessage.message} />
          </div>
        }
        <div className='overflow-x-auto mb-5'>
          <div className='flex gap-3'>
            <select
              onChange={(e) => handleOrderChange(e)}
              className='select select-bordered max-w-xs'
            >
              <option disabled value="">Order by</option>
              <option selected value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
            {orderManagementNavigation.map((link) => (
              <Link to={link.path} key={link.name} className={`btn btn-outline btn-primary`}>{link.name}</Link>
            ))}
          </div>
        </div>
        <AdminTable>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th className='w-60'>Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.fullName}</td>
                <td>{order.email}</td>
                <td>{detailFormatDate(order.createdAt)}</td>
                <td><span className={handleStatusText(order.status).color}>{handleStatusText(order.status).status}</span></td>
                <td>{order.total}</td>
                <td className='flex gap-3'>
                  {/* <Link className='btn btn-neutral'><EyeIcon /></Link> */}
                  <OrderModal
                    modalId={order.orderId}
                    orderId={order.orderId}
                    status={order.status}
                    date={formatDate(order.createdAt)}
                    total={order.total}
                    productSnapshots={order.productSnapshots}
                  />
                  {order.status === "PENDING" &&
                    <ConfirmWindow
                      elementId={`confirm-complete-${order.orderId}`}
                      buttonClass="btn btn-primary"
                      confirmButtonText="Complete order"
                      message={`Are you sure to complete order ID: ${order.orderId}?`}
                      action={() => handleCompleteOrder(order.orderId)}
                      icon={<CheckIcon />}
                    />
                  }

                  {order.status === "PENDING" &&
                    <ConfirmWindow
                      elementId={`confirm-cancel-${order.orderId}`}
                      buttonClass="btn btn-error"
                      confirmButtonText="Yes, cancel order"
                      message={`Are you sure to cancel order ID: ${order.orderId}?`}
                      productName={"order.productName"}
                      action={() => handleCancelOrder(order.orderId)}
                      icon={<CrossIcon />}
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      </AdminLayout >
    </>
  )
}

const OrderModal = ({
  orderId,
  modalId,
  status,
  date,
  total,
  productSnapshots
}) => {
  return (
    <>
      <button className="btn btn-neutral"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <EyeIcon />
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Order Details</h3>
          <OrderCard
            orderId={orderId}
            status={status}
            date={formatDate(date)}
            total={total}
            productSnapshots={productSnapshots}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>

        </div>
      </dialog>
    </>
  )
}

export default OrderManagement;