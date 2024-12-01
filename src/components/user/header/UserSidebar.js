import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BagIcon, CartIcon, CompanyIcon, UserIcon } from '../../../assets/SvgIcons'
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';

export const UserSidebar = (props) => {
  return (
    <div className="border shadow rounded p-5">
      <div className='text-center flex flex-col gap-3'>
        <img src="https://cdn4.sharechat.com/beautifulgirlprofilepicture_2fd82a95_1601311911497_cmprsd_40.jpg?tenant=sc&referrer=pwa-sharechat-service&f=rsd_40.jpg" alt="" className='mx-auto object-cover mask mask-circle w-24' />
        <div>
          <h1 className='text-xl font-semibold'>{props?.fullname}</h1>
          <div className="group relative">
            <div className="truncate max-w-xs" title={props.email}>
              {props.email}
            </div>
            <div className="hidden group-hover:block absolute z-10 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap left-1/2 transform -translate-x-1/2">
              {props.email}
            </div>
          </div>
        </div>
      </div>

      <ul className='mt-6'>
        <li><Link to={`/user`} className='w-full px-3 py-4 flex gap-3 rounded hover:bg-slate-100'><UserIcon /> Profile</Link></li>
        {props?.isAdmin &&
          <li><Link to={`/admin`} className='w-full px-3 py-4 flex gap-3 rounded hover:bg-slate-100'><CompanyIcon /> Administrator</Link></li>
        }
        {!props?.isAdmin &&
          <li><Link to={`/user/orders`} className='w-full px-3 py-4 flex gap-3 rounded hover:bg-slate-100'><BagIcon /> Orders</Link></li>
        }
        {!props.isAdmin &&
          <li><Link to={`/my-cart`} className='w-full px-3 py-4 flex gap-3 rounded hover:bg-slate-100'><CartIcon /> Shopping Cart</Link></li>
        }
      </ul>
    </div>
  )
}
