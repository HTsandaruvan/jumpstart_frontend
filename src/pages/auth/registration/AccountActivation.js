import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import { PageHeading } from '../../../components/PageHeading';
import not_found from '../../../assets/images/not_found.svg'
import welcome from '../../../assets/images/welcome.png'
import { Link, useParams } from 'react-router-dom';
import useDocumentTitle from '../../useDocumentTitle';
import { accountActivationApi } from '../../../api/auth-api';

export const InvalidUrlView = (props) => {
  return (
    <>
      {props.message ?
        <PageHeading headingTitle={props.message} /> :
        <PageHeading headingTitle="Invalid URL" />
      }
      <Link to={'/'} className='btn btn-primary'>Go to home</Link>
      <img src={not_found} alt="url not found illustration" className='mx-auto h-96' />
    </>
  )
}

const AccountActivation = () => {
  useDocumentTitle("Account Activation")
  const { uuid } = useParams();

  const [email, setEmail] = useState("")
  const [isValidUrl, setValidUrl] = useState(false)

  useEffect(() => {
    accountActivationApi(uuid)
      .then(res => {
        setValidUrl(true)
        setEmail(res.data.result.email)
      })
      .catch((error) => {
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
        <div className='py-10 px-10 sm:px-10 md:px-40 lg:px-72'>
          <div className='text-center'>
            {isValidUrl === true ?
              (
                <>
                  <PageHeading headingTitle="Your account successfully activated!" />
<br></br>
                  <div className='text-xl mb-3'>Your email: <span className='p-2 rounded-md '>{email}</span></div>
                  <Link to={'/login'} className='btn btn-primary'>Login</Link>
                  <img src={welcome} alt="welcome illustration" className='mx-auto h-80 w-96' />
                </>
              ) :
              (
                <>
                  <InvalidUrlView />
                </>
              )
            }
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AccountActivation;