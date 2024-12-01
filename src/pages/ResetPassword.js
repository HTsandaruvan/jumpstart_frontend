import React, { useEffect, useState } from "react";
import reset_password from '../assets/images/reset_password.png'
import { AlertMessage } from "../components/AlertMessage";
import { Link } from "react-router-dom";
import useDocumentTitle from "./useDocumentTitle";
import Layout from "../components/Layout";
import { findAccounByUuidtApi, resetPasswordApi } from "../api/auth-api";
import { InvalidUrlView } from "./auth/registration/AccountActivation";
import { useFormik } from "formik";
import * as Yup from "yup"
import { PageHeading } from "../components/PageHeading";

const ResetPasswordForm = ({ uuid }) => {
  const [alertMessage, setAlertMessage] = useState(null)
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Please input your new password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords don't match")
        .required("Required!")
    }),
    onSubmit: async (values) => {
      const formData = {
        uuid: uuid,
        password: values.newPassword
      }
      resetPasswordApi(formData)
        .then(res => {
          setAlertMessage(
            {
              messageType: "success",
              message: res.data.message,
              redirectBtnName: "Login",
              redirectTo: "/login"
            }
          )
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
        })
    }
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

  return (
    <div class="serviceBox">
      <PageHeading headingTitle="Reset password" />
      {
        alertMessage &&
        <AlertMessage
          messageType={alertMessage.messageType}
          message={alertMessage.message}
          redirectBtnName={alertMessage.redirectBtnName}
          redirectTo={alertMessage.redirectTo}
        />
      }
      <form onSubmit={handleSubmit} className="grid gap-y-3 mb-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">New password</span>
          </label>
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input input-bordered w-full"
          />
          {errors.newPassword && touched.newPassword &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.newPassword}</span>
            </label>
          }
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Confirm new password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input input-bordered w-full"
          />
          {errors.confirmPassword && touched.confirmPassword &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.confirmPassword}</span>
            </label>
          }
        </div>
        <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2 w-full">Continue</button>
      </form>
      <hr />
      <p className="text-center mt-4">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

const ResetPassword = () => {
  useDocumentTitle(`Reset Password`);
  const queryParameters = new URLSearchParams(window.location.search)
  const uuid = queryParameters.get("reset")

  const [isValidUrl, setValidUrl] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    findAccounByUuidtApi(uuid)
      .then(res => {
        setValidUrl(true)
      })
      .catch(error => {
        if (error?.response?.data) {
          // error message from backend
          setValidUrl(false)
          // console.log("error 1: " + error?.response?.data.message)
        } else if (error) {
          // error message from client
          setValidUrl(false)
          // console.log("error 2: " + error.message)
        } else {
          setValidUrl(false)
          console.log("No response from server")
        }
      })
  }, [])
  return (
    <>
      <Layout>
        {isValidUrl ?
          (
            <div className='py-10 sm:flex sm:flex-wrap sm:flex-col md:grid md:grid-cols-12 p-5 '>
              <div className='lg:px-10 md:px-8 py-5 sm:col-span-12 md:col-span-6 hidden sm:hidden md:block lg:block'>
                <img src={reset_password} alt="Reset password illustration" />
              </div>
              <div className='lg:px-20 md:px-8 py-5 sm:col-span-12 md:col-span-6'>
                <ResetPasswordForm uuid={uuid} />
              </div>
            </div>
          ) :
          (
            <div className='py-10 px-10 sm:px-10 md:px-40 lg:px-72 text-center'>
              <InvalidUrlView />
            </div>
          )
        }
      </Layout>
    </>
  );
}

export default ResetPassword;