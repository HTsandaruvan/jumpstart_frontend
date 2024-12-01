import React, { useEffect, useState } from "react";
import register from '../../../assets/images/register.png'
import { AlertMessage } from "../../../components/AlertMessage";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import useDocumentTitle from "../../useDocumentTitle";
import { useFormik } from "formik";
import axios from "../../../api/axios";
import * as Yup from "yup";
import { PageHeading } from "../../../components/PageHeading"
import { useRedirectUser } from "../../../hooks/redirectUser";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

const RegistrationForm = () => {
  useDocumentTitle(`Register`);

  const redirectUser = useRedirectUser()
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const isLogin = useIsAuthenticated()

  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    if (isLogin()) {
      redirectUser(role)
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name required"),
      lastName: Yup.string()
        .required("Last name required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
      password: Yup.string()
        .required("Password required")
    }),
    onSubmit: async (values) => {
      try {
        const formData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        }
        await axios.post("/api/auth/register", formData)
          .then(res => {
            formik.resetForm();
            setAlertMessage(
              {
                messageType: "success",
                message: res.data.message
              }
            )
          })
      }
      catch (error) {
        if (error?.response?.data) {
          // error message from backend
          setAlertMessage(
            {
              messageType: "error",
              message: error?.response?.data.message
            }
          )
        } else if (error) {
          // error message from client
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
      }
    }

  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  return (
   
    
    <div class="serviceBox">
      <PageHeading headingTitle="Register" />
      {
        alertMessage &&
        <AlertMessage messageType={alertMessage.messageType} message={alertMessage.message} />
      }


      <form onSubmit={handleSubmit} className="grid gap-y-3 mb-4">
      
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">First name</span>
          </label>
          <input
            type="text"
            placeholder="First name"
            className="input input-bordered w-full"
            name="firstName"
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
            name="lastName"
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
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.email}</span>
            </label>
          }
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password &&
            <label className="label">
              <span className="label-text-alt text-red-600">{errors.password}</span>
            </label>
          }
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2 w-full">Register</button>
       
      </form>
      <div className="text-center text-md">
        <div>-or-</div>

        <button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 mt-4">
          <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
          </svg>
          Sign in with Google
        </button>
        <button type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 mt-4">
          <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
          </svg>
          Sign in with Facebook
        </button>
      </div>
      <hr />
      <p className="text-center mt-4">Already have an account? <Link to="/login" className="link">Login</Link></p>
    </div>
  
  );
}

const Registration = () => {
  return (
    <>
      <Layout>
        <div className='py-10 sm:flex sm:flex-wrap sm:flex-col md:grid md:grid-cols-12 p-5 '>
          <div className='lg:px-1 md:px-8 py-5 sm:col-span-12 md:col-span-6 hidden sm:hidden md:block lg:block'>
            <img src={register} alt="Registration illustration" />
          </div>
          <div className='lg:px-20 md:px-8 py-5 sm:col-span-12 md:col-span-6'>
            <RegistrationForm />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Registration;