import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/layout/AdminLayout'
import { PageHeading } from '../../components/PageHeading'
import useDocumentTitle from '../useDocumentTitle'
import { EditIcon, EyeIcon, TrashIcon } from '../../assets/SvgIcons'
import { Link, useNavigate } from 'react-router-dom'
import { AdminTable } from '../../components/AdminTable'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { deleteUserByUserIdApi } from '../../api/admin-api'
import { useRedirectUser } from '../../hooks/redirectUser'
import { ConfirmWindow } from '../../components/ConfirmWindow'
import { showUsersApi } from '../../api/admin-api'
import { formatDate } from '../../utils/utils'

const UserManagement = () => {
  useDocumentTitle('User Management')

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  const handleDeleteUser = (userId) => {
    deleteUserByUserIdApi(token, userId)
      .then(response => {
        console.log(response)
        setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      })
      .catch(error => {
        if (typeof error === "string") {
          console.log("Error message: " + error)
        } else {
          console.log(error)
        }
      })
  }
  const [users, setUsers] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0)
    showUsersApi(token)
      .then(res => {
        setUsers(res.data.result.customers)
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data.message)
        } else if (error) {
          if (error.status) {
            navigate("/login")
          }
          console.log(error.message)
        } else {
          console.log(error)
        }
      })
  }, [])

  return (
    <>
      <AdminLayout>
        <PageHeading headingTitle='Customers' />
        <AdminTable>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered at</th>
              <th>Activation</th>
              <th>Role</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.registeredAt)}</td>
                <td>{user.isActive === true ? "ACTIVE" : "NOT ACTIVATED"}</td>
                <td>{user.role}</td>
                <td className='flex gap-3'>
                  <Link to={`/admin/users/detail/${user.userId}`} className='btn btn-neutral'><EyeIcon /></Link>
                  <Link className='btn btn-secondary'><EditIcon /></Link>
                  <ConfirmWindow
                    elementId={`confirm-{user.productId}`}
                    buttonClass="btn btn-error"
                    confirmButtonText="Yes, delete user"
                    message={`Are you sure to delete user ID: {user.userId}?`}
                    name={"user.username"}
                    action={() => handleDeleteUser(user.userId)}
                    icon={<TrashIcon />}
                  />
                </td> 
              </tr>
            ))}
          </tbody>
        </AdminTable>
      </AdminLayout >
    </>
  )
}

export default UserManagement;