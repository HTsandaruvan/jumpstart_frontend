import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/layout/AdminLayout'
import { PageHeading } from '../../components/PageHeading'
import useDocumentTitle from '../useDocumentTitle'
import { Link, useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useRedirectUser } from '../../hooks/redirectUser'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { addProductApi } from '../../api/admin-api'
import { showAllCategoriesApi } from '../../api/public-api'
import axios from '../../api/axios'
import { AlertMessage } from '../../components/AlertMessage'

const AddProduct = () => {
  useDocumentTitle('Add Product')

  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const email = auth()?.email
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()
  const redirectUser = useRedirectUser()

  const [categories, setCategories] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    disableScroll()
    showAllCategoriesApi()
      .then(res => {
        setCategories(res.data.result)
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
        } else {
          return "No respon from server"
        }
      })
  }, [])

  const disableScroll = () => {
    const inputs = document.querySelectorAll('.input-number');

    inputs.forEach(input => {
      input.addEventListener('wheel', (event) => {
        event.preventDefault();
        input.blur();
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      slug: "",
      description: "",
      price: 0,
      oldPrice: "",
      stock: 0,
      weight: 0,
      categoryId: 0,
      image: null,
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .required("Product name required"),
      slug: Yup.string()
        .matches(/^[a-zA-Z0-9-]+$/, "Only alphabets, numbers, and hyphens are allowed")
        .required("Product name required"),
      description: Yup.string()
        .required("Please add description"),
      price: Yup.number()
        .required("Price required ($9,999,999.99 maximum)")
        .max(9999999.99),
      oldPrice: Yup.number()
        .max(9999999.99),
      stock: Yup.number()
        .required("Stock required")
        .min(1, "Stock must be greater than or equal to 1"),
      weight: Yup.number()
        .required("Weight required (in kg)")
        .min(0.01, "Weight must be greater than or equal to 0.01 kg"),
      categoryId: Yup.number()
        .notOneOf([0], "Please choose category")
        .required('Category is required'),
      image: Yup.mixed().required("Please provide a photo"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("productName", values.productName);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("oldPrice", values.oldPrice);
      formData.append("stock", values.stock);
      formData.append("weight", values.weight);
      formData.append("categoryId", values.categoryId);

      addProductApi(token, formData)
        .then(res => {
          console.log(res.data.result.slug)
          navigate(`/p/${res.data.result.slug}`, {
            state: {
              isNewAddedProduct: true,
              messageType: "success",
              message: res.data.message
            }
          })
        })
        .catch(error => {
          if (error?.response?.data) {
            // error message from backend
            setAlertMessage(
              {
                messageType: "error",
                message: error?.response?.data.message
              }
            )
          } else if (error) {
            if (error.status) {
              navigate("/login")
            }
            setAlertMessage(
              {
                messageType: "error",
                message: error.message
              }
            )
          } else {
            setAlertMessage(
              {
                messageType: "error",
                message: "No response from server"
              }
            )
          }
          setTimeout(() => {
            setAlertMessage(null)
          }, 3000)
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
          <PageHeading headingTitle='Add Product' />
        </div>
        {alertMessage &&
          <div className="mb-3">
            <AlertMessage messageType={alertMessage.messageType} message={alertMessage.message} />
          </div>
        }
        <form
          onSubmit={handleSubmit}
          className='grid gap-y-3'>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product name</span>
            </label>
            <input
              type="text"
              placeholder="Product name"
              className="input input-bordered w-full"
              name='productName'
              value={values.productName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.productName && touched.productName &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.productName}</span>
              </label>
            }
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Slug</span>
            </label>
            <input
              type="text"
              placeholder="Ex: product-name"
              className="input input-bordered w-full"
              name='slug'
              value={values.slug}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.slug && touched.slug &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.slug}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered max-w-xs"
              name='categoryId'
              value={values.categoryId}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option disabled selected value={0}>Choose category</option>
              {categories.length !== 0 && categories.map((category) => (
                <option value={category?.categoryId} key={category?.categoryId}>{category.categoryName}</option>
              )
              )}
            </select>
            {errors.categoryId && touched.categoryId &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.categoryId}</span>
              </label>
            }
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              accept=".jpeg, .jpg, ,.png, .avif"
              className="file-input file-input-bordered  w-full max-w-xs"
              name="image"
              onChange={(event) =>
                formik.setFieldValue("image", event.target.files[0])
              }
              onBlur={handleBlur}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-80"
              placeholder="Product Description"
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.description && touched.description &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.description}</span>
              </label>
            }
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price (in USD)</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-number input-bordered w-full"
              name='price'
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.price}</span>
              </label>
            }
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Old Price (in USD)</span>
            </label>
            <input
              type="number"
              placeholder="Old Price"
              className="input input-number input-bordered w-full"
              name='oldPrice'
              value={values.oldPrice}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.oldPrice}</span>
              </label>
            }
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              placeholder="Stock"
              className="input input-number input-bordered w-full"
              name='stock'

              value={values.stock}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.stock && touched.stock &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.stock}</span>
              </label>
            }
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Weight (in kg)</span>
            </label>
            <input
              type="number"
              placeholder="Weight"
              className="input input-number input-bordered w-full"
              name='weight'
              value={values.weight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.weight && touched.weight &&
              <label className="label">
                <span className="label-text-alt text-red-600">{errors.weight}</span>
              </label>
            }
          </div>
          <button type='submit' className='btn btn-primary'>Add product</button>
        </form>
      </AdminLayout >
    </>
  )
}

export default AddProduct;