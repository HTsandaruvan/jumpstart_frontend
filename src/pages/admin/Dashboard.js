import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../components/admin/header/AdminSidebar'
import AdminLayout from '../../components/admin/layout/AdminLayout'
import { PageHeading } from '../../components/PageHeading'
import { Stat } from '../../components/Stat'
import useDocumentTitle from '../useDocumentTitle'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { useRedirectUser } from '../../hooks/redirectUser'
import { showStatsApi } from '../../api/admin-api'

const Dashboard = () => {
  useDocumentTitle('Admin Dashboard')

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  const [stats, setStats] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    showStatsApi(token)
      .then(res => {
        setStats(res.data.result)
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
        <PageHeading headingTitle='Admin Dashboard' />
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-5">
          <Stat name='Revenue' amount={`$${stats.revenue}`} />
          <Stat name='Customer' amount={`${stats.customerNumbers}`} />
          <Stat name='Orders' amount={`${stats.orderNumbers}`} />
          <Stat name='Products' amount={`${stats.productNumbers}`} />
          <Stat name='Categories' amount={`${stats.categoryNumbers}`} />
        </div>
      </AdminLayout>
    </>
  )
}

export default Dashboard;