import React, { useEffect, useState } from 'react'
import { PageHeading } from '../../components/PageHeading';
import UserLayout from '../../components/user/layout/UserLayout';
import useDocumentTitle from '../useDocumentTitle';
import { useFormik } from 'formik'
import * as Yup from "yup"
import { BackButton } from '../../components/BackButton';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { myProfileApi, updateProfileApi } from '../../api/user-api';
import { useNavigate } from 'react-router-dom';
import { AlertMessage } from '../../components/AlertMessage';


const UpdateProfile = () => {
  useDocumentTitle("Update Profile")
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate()

  const [userProfile, setUserProfile] = useState({})
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    myProfileApi(token)
      .then(res => {
        setUserProfile({
          firstName: res.firstName,
          lastName: res.lastName,
          gender: res.gender,
          city: res.city,
          country: res.country,
          address: res.address
        });
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
      });
  }, [token])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      gender: userProfile.gender,
      city: userProfile.city,
      country: userProfile.country,
      address: userProfile.address
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name required"),
      lastName: Yup.string()
        .required("Last name required"),
      gender: Yup.string()
        .required('Gender is required'),
      city: Yup.string()
        .required("City required"),
      country: Yup.string()
        .required("Country required"),
      address: Yup.string()
        .required("Address required"),
    }),
    onSubmit: (values) => {
      updateProfileApi(token, {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        city: values.city,
        country: values.country,
        address: values.address
      })
        .then(res => {
          formik.resetForm();
          navigate(`/user`, {
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
    <UserLayout>
      <div className='flex'>
        <BackButton to="/user" />
        <PageHeading headingTitle='Update profile' />
      </div>
      {alertMessage &&
        <div className='mb-4'>
          <AlertMessage messageType={alertMessage.messageType} message={alertMessage.message} />
        </div>
      }
      <form onSubmit={handleSubmit} className='grid gap-y-3'>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">First name</span>
          </label>
          <input
            type="text"
            placeholder="First name"
            className="input input-bordered w-full"
            name='firstName'
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && touched.firstName &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.firstName}</span>
            </label>
          }
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Last name</span>
          </label>
          <input
            type="text"
            placeholder="Last name"
            className="input input-bordered w-full"
            name='lastName'
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && touched.lastName &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.lastName}</span>
            </label>
          }
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select select-bordered max-w-xs"
            name='gender'
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option disabled selected value="">Select gender</option>
            <option value={"MALE"}>Male</option>
            <option value={"FEMALE"}>Female</option>
          </select>
          {errors.gender && touched.gender &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.gender}</span>
            </label>
          }
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            placeholder="City"
            className="input input-bordered w-full"
            name='city'
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.city && touched.city &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.city}</span>
            </label>
          }
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            placeholder="Country"
            className="input input-bordered w-full"
            name='country'
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.country && touched.country &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.country}</span>
            </label>
          }
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full"
            name='address'
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address && touched.address &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.address}</span>
            </label>
          }
        </div>
        <button type='submit' className='btn btn-primary'>Save update</button>
      </form>
    </UserLayout >
  )
}

export default UpdateProfile;