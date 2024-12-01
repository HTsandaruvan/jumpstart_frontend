import './App.css';
import { Route, Routes } from "react-router";
import Login from './pages/auth/login/Login';
import Registration from './pages/auth/registration/Registration';
import ForgottenPassword from './pages/ForgottenPassword';
import ResetPassword from './pages/ResetPassword';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { Profile } from './pages/user/Profile';
import { MyCart } from './pages/user/MyCart';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Inventory from './pages/admin/Inventory';
import UpdateProfile from './pages/user/UpdateProfile';
import MyOrders from './pages/user/MyOrders';
import AddProduct from './pages/admin/AddProduct';
import CreateCategory from './pages/admin/CreateCategory';
import ContactUs from './pages/ContactUs';
import UpdateProduct from './pages/admin/UpdateProduct';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AccountActivation from './pages/auth/registration/AccountActivation';
import { RequireAuth } from 'react-auth-kit';
import Category from './pages/Category';
import { RedirectCapture, RedirectCancel } from './hooks/PaymentRedirect';
import ProductSnapshot from './pages/user/ProductSnapshot';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/account-activation/:uuid' element={<AccountActivation />} />
          <Route path='/category' element={<Category />} />
          <Route path='/products' element={<Products />} />
          <Route path='/p/:slug' element={<ProductDetail />} />
          <Route path='/find-account' element={<ForgottenPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/contact-us' element={<ContactUs />} />

          <Route path='/capture' element={<RedirectCapture />} />
          <Route path='/cancel' element={<RedirectCancel />} />

          <Route path='*' element={<NotFound />} />

          {/* User Routes */}
          <Route
            path='/user'
            element={
              <RequireAuth loginPath='/login'>
                <Profile />
              </RequireAuth>
            } />
          <Route
            path='/user/profile'
            element={
              <RequireAuth loginPath='/login'>
                <Profile />
              </RequireAuth>
            } />
          <Route
            path='/user/profile/update'
            element={
              <RequireAuth loginPath='/login'>
                <UpdateProfile />
              </RequireAuth>
            } />
          <Route
            path='/user/orders'
            element={
              <RequireAuth loginPath='/login'>
                <MyOrders />
              </RequireAuth>
            } />
          <Route
            path='/p/snapshot/:slug'
            element={
              <RequireAuth loginPath='/login'>
                <ProductSnapshot />
              </RequireAuth>
            } />
          <Route
            path='/my-cart'
            element={
              <RequireAuth loginPath='/login'>
                <MyCart />
              </RequireAuth>
            } />

          {/* Admin Routes */}
          <Route
            path='/admin'
            element={
              <RequireAuth loginPath='/login'>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path='/admin/orders'
            element={
              <RequireAuth loginPath='/login'>
                <OrderManagement />
              </RequireAuth>
            }
          />
          <Route
            path='/admin/inventory'
            element={
              <RequireAuth loginPath='/login'>
                <Inventory />
              </RequireAuth>
            } />
          <Route
            path='/admin/customers'
            element={
              <RequireAuth loginPath='/login'>
                <UserManagement />
              </RequireAuth>} />
          <Route
            path='/admin/add-product'
            element={
              <RequireAuth loginPath='/login'>
                <AddProduct />
              </RequireAuth>} />
          <Route
            path='/admin/update-product/:slug'
            element={
              <RequireAuth loginPath='/login'>
                <UpdateProduct />
              </RequireAuth>} />
          <Route
            path='/admin/update-product'
            element={
              <RequireAuth loginPath='/login'>
                <UpdateProduct />
              </RequireAuth>
            } />
          <Route
            path='/admin/create-category'
            element={
              <RequireAuth loginPath='/login'>
                <CreateCategory />
              </RequireAuth>
            } />
        </Routes>
      </div>
    </>
  );
}

export default App;
