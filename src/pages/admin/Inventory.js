import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/layout/AdminLayout'
import { PageHeading } from '../../components/PageHeading'
import useDocumentTitle from '../useDocumentTitle'
import { EditIcon, EyeIcon, TrashIcon } from '../../assets/SvgIcons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminTable } from '../../components/AdminTable'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useRedirectUser } from '../../hooks/redirectUser'
import { showAllProductsApi } from '../../api/public-api'
import { deleteProductByProductIdApi } from '../../api/admin-api'
import { ConfirmWindow } from '../../components/ConfirmWindow'
import { AlertMessage } from '../../components/AlertMessage'

const Inventory = () => {
  useDocumentTitle('Inventory')

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()
  const location = useLocation();

  const handleDeleteProduct = (productId) => {
    deleteProductByProductIdApi(token, productId)
      .then(response => {
        console.log(response)
        setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
      })
      .catch(error => {
        if (typeof error === "string") {
          console.log("Error message: " + error)
        } else {
          console.log(error)
        }
      })
  }

  const inventoryNavigation =
    [
      {
        name: "+ Add product",
        path: "/admin/add-product"
      },
      {
        name: "Create category",
        path: "/admin/create-category"
      },
    ]

  const [products, setProducts] = useState([])
  const isNewCreatedCategory = location?.state?.isNewCreatedCategory;
  const messageType = location?.state?.messageType;
  const message = location?.state?.message;

  useEffect(() => {
    window.scrollTo(0, 0)
    showAllProductsApi()
      .then(res => {
        setProducts(res.data.result)
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
        } else {
          return "No respon from server"
        }
      })
    window.history.replaceState(null, null)
  }, [])

  return (
    <>
      <AdminLayout>
        {isNewCreatedCategory &&
          <AlertMessage messageType={messageType} message={message} />
        }
        <PageHeading headingTitle='Store' />
        <div className='overflow-x-auto mb-5'>
          <div className='flex gap-3'>
            {inventoryNavigation.map((link) => (
              <Link to={link.path} key={link.name} className='btn btn-outline btn-primary'>{link.name}</Link>
            ))}
          </div>
        </div>
        <AdminTable>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.category.categoryName}</td>
                <td>{product.stock}</td>
                <td>{'$' + product.productId}</td>
                <td className='flex gap-3'>
                  <Link
                    to={`/p/${product.slug}`}
                    className='btn btn-neutral'
                  >
                    <EyeIcon />
                  </Link>
                  <Link
                    to={`/admin/update-product/${product.slug}`}
                    className='btn btn-secondary'
                  >
                    <EditIcon />
                  </Link>
                  <ConfirmWindow
                    elementId={`confirm-${product.productId}`}
                    buttonClass="btn btn-error"
                    confirmButtonText="Yes, delete product"
                    message={`Are you sure to delete product ID: ${product.productId}?`}
                    name={product.productName}
                    action={() => handleDeleteProduct(product.productId)}
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

export default Inventory;