import React, { useEffect } from 'react'
import { AdminSidebar } from '../../components/admin/header/AdminSidebar'
import AdminLayout from '../../components/admin/layout/AdminLayout'
import { PageHeading } from '../../components/PageHeading'
import { Stat } from '../../components/Stat'
import useDocumentTitle from '../useDocumentTitle'
import { BackIcon, EyeIcon, TrashIcon } from '../../assets/SvgIcons'
import { Link, useNavigate } from 'react-router-dom'
import { AdminTable } from '../../components/AdminTable'
import { BackButton } from '../../components/BackButton'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useRedirectUser } from '../../hooks/redirectUser'
import { createCategoryApi } from '../../api/admin-api'
import { useFormik } from 'formik'
import * as Yup from "yup"

const CreateCategory = () => {
  useDocumentTitle('Create Category')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  const formik = useFormik({
    initialValues: {
      categoryName: ""
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .required("Category name required"),
    }),
    onSubmit: (values) => {
      createCategoryApi(token, {
        categoryName: values.categoryName
      })
        .then(res => {
          navigate(`/admin/inventory`, {
            state: {
              isNewCreatedCategory: true,
              messageType: "success",
              message: res.data.message
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;


  return (
    <>
      <AdminLayout>
        <div className='flex'>
          <BackButton to="/admin/inventory" />
          <PageHeading headingTitle='Create Category' />
        </div>
        <form onSubmit={handleSubmit} className='grid gap-y-3'>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category name</span>
            </label>
            <input
              type="text"
              placeholder="Category name"
              className="input input-bordered w-full"
              name='categoryName'
              value={values.categoryName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <button type='submit' className='btn btn-primary'>Create Category</button>
        </form>
      </AdminLayout >
    </>
  )
}

export default CreateCategory;