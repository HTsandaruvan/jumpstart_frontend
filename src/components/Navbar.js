import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { getMyCartApi } from '../api/user-api';

export const Navbar = () => {
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const isLogin = useIsAuthenticated()
  const token = auth()?.token
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const signOut = useSignOut();
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate("/")
  }

  const queryParameters = new URLSearchParams(window.location.search)
  const searchParam = queryParameters.get("q")

  const [searchQuery, setSearchQuery] = useState(searchParam)

  return (

    <div className="fixed z-20 navbar bg-base-100 shadow-md opacity-95 ">

      <div className="flex-1 animate-bounce w-6 h-6">
        <Link to={'/'} className=" text-xl">
          <img src={logo} alt="Jumpstart Logo" style={{ height: "80px" }} /> <span className='hidden sm:hidden md:block lg:block'></span>
        </Link>
      </div>

      <div className="flex-none gap-4">
        <div className="form-control w-72 ">

          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

          </div>
          <input
            type="text"
            placeholder="Search in Jumpstart"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/products?q=${searchQuery}`);
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5    dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>



        <div className='hidden sm:hidden md:flex lg:flex gap-4'>
          <Link to={'/products'} className='btn btn-ghost drawer-button font-normal hover:scale-125'>Products</Link>
          <Link to={'/category'} className='btn btn-ghost drawer-button font-normal hover:scale-125'>Category</Link>


        </div>
        

        {!isLogin() ?
          (
            <div className='flex gap-6'>
              <Link to={'/login'} className='btn btn-primary hover:scale-125 '>Login</Link>
              <Link to={'/register'} className='btn btn-outline btn-primary '>Register</Link>

            </div>

          ) :
          (
            <>
              {!isAdmin &&
                (
                  <div className="dropdown dropdown-end">
                    <Link to={"/my-cart"} className="btn btn-ghost btn-circle">
                      <div className="indicator ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        {/* <span className="badge badge-sm indicator-item">{cart.itemNumbers}</span> */}
                      </div>
                    </Link>
                  </div>
                )
              }

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Photos.png" alt='user avatar' />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to={'/user/profile'} className="justify-between">Profile</Link>
                  </li>

                  {isAdmin &&
                    <li>
                      <Link to={'/admin'} className="justify-between">Admin Dashboard</Link>
                    </li>
                  }

                  {!isAdmin &&
                    <li>
                      <Link to={'/user/orders'} className="justify-between">Orders</Link>
                    </li>
                  }
                  {!isAdmin &&
                    <li>
                      <Link to={'/my-cart'} className="justify-between">Shopping Cart</Link>
                    </li>
                  }
                  <li>
                    <button onClick={() => handleSignOut()} className="justify-between">Log Out</button>
                  </li>
                </ul>
              </div>
            </>
          )
        }
      </div>
      <button type="button" data-dropdown-toggle="language-dropdown-menu" class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-dark rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white ml-11">
          <svg class="w-5 h-5 mr-2 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z" /><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300" /><path fill="#3c3b6e" d="M0 0h2964v2100H0z" /><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z" /><use xlinkhref="#a" y="420" /><use xlinkhref="#a" y="840" /><use xlinkhref="#a" y="1260" /></g><use xlinkhref="#a" y="1680" /></g><use xlinkhref="#b" x="247" y="210" /></g><use xlinkhref="#c" x="494" /></g><use xlinkhref="#d" x="988" /><use xlinkhref="#c" x="1976" /><use xlinkhref="#e" x="2470" /></g></svg>
          English (US)
        </button>

        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700" id="language-dropdown-menu">
          <ul class="py-2 font-medium" role="none">
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                <div class="inline-flex items-center">

                </div>
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                <div class="inline-flex items-center">
                  <svg class="h-3.5 w-3.5 rounded-full mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512"><path fill="#ffce00" d="M0 341.3h512V512H0z" /><path d="M0 0h512v170.7H0z" /><path fill="#d00" d="M0 170.7h512v170.6H0z" /></svg>
                  Deutsch
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                <div class="inline-flex items-center">
                  <svg class="h-3.5 w-3.5 rounded-full mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512v512H0z" /><path fill="#009246" d="M0 0h170.7v512H0z" /><path fill="#ce2b37" d="M341.3 0H512v512H341.3z" /></g></svg>
                  Italiano
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                <div class="inline-flex items-center">
                  <svg class="h-3.5 w-3.5 rounded-full mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" id="flag-icon-css-cn" viewBox="0 0 512 512"><defs><path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z" /></defs><path fill="#de2910" d="M0 0h512v512H0z" /><use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)" xlinkhref="#a" /><use width="30" height="20" transform="rotate(-121 142.6 -47) scale(25.5827)" xlinkhref="#a" /><use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)" xlinkhref="#a" /><use width="30" height="20" transform="rotate(-74 272.4 -114) scale(25.6137)" xlinkhref="#a" /><use width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)" xlinkhref="#a" /></svg>
                  中文
                </div>
              </a>
            </li>
          </ul>
        </div>
        <button data-collapse-toggle="navbar-language" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-language" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
    </div>
  )
}