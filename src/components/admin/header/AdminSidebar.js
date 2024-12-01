import React from 'react'
import { BagIcon, CartIcon, DashboardIcon, LogOutIcon, UserIcon, UsersIcon } from '../../../assets/SvgIcons'
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'

export const adminLinks = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <BagIcon />
  },
  {
    name: "Store",
    path: "/admin/inventory",
    icon: <CartIcon />
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <UsersIcon />
  }
];

export const AdminSidebar = () => {
  return (
    <>
      <div className="border shadow rounded p-5">
        <div className='text-center flex flex-col gap-3'>
          <Link to={'/admin'} className='btn btn-info'>
            <h1 className='text-xl font-semibold'>Administrator</h1>
          </Link>
        </div>
        <ul className="">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
            >
              <li className='w-full px-3 py-4 flex gap-3 rounded hover:bg-slate-100'>
                {link.icon}
                <span>{link.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}
