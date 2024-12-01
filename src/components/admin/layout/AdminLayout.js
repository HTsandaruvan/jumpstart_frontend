import React, { useEffect, useState } from 'react'
import { AdminSidebar, adminLinks } from '../header/AdminSidebar';
import { useWindowSize } from "@uidotdev/usehooks";
import Layout from '../../Layout';

import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useRedirectUser } from '../../../hooks/redirectUser';

const AdminLayout = (props) => {
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  useEffect(() => {
    if (isLogin() && !isAdmin) {
      redirectUser(role)
    }
  })
  return (
    <>
      <Layout>
        <div className='py-10 grid grid-cols-12 px-5 sm:px-5 md:px-5 lg:px-20'>
          <div className='mx-5 hidden sm:hidden md:hidden lg:block lg:col-span-3'>
            <AdminSidebar />
          </div>
          <div className='mx-5 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 bg-white'>
            <div className='lg:hidden overflow-x-auto mb-5'>
              <div className='flex gap-3'>
                {
                  adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className='btn btn-outline btn-primary'
                    >{link.name}
                    </Link>
                  )
                  )
                }
              </div>
            </div>
            <div className="border rounded p-5">
              {props.children}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AdminLayout;