import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { UserSidebar } from '../header/UserSidebar'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { myProfileApi } from '../../../api/user-api';

const UserLayout = (props) => {
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()

  const [fullname, setFullname] = useState("")

  useEffect(() => {
    myProfileApi(token)
      .then(res => {
        setFullname(res.firstName + " " + res.lastName);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token])

  return (
    <>
      <Layout>
        <div className='py-10 grid grid-cols-12 px-5 sm:px-5 md:px-5 lg:px-20'>
          <div className='mx-5 hidden sm:hidden md:hidden lg:block lg:col-span-3'>
            <UserSidebar isAdmin={isAdmin} email={email} fullname={fullname} />
          </div>
          <div className='mx-5 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 shadow-2xl opacity-90'>
            <div className="border rounded p-5">
              {props.children}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UserLayout;