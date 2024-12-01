import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import { PageHeading } from '../components/PageHeading';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Layout>
        <div className='py-10 px-10 sm:px-10 md:px-40 lg:px-72'>
          <div className="text-center">
            <PageHeading headingTitle='Do you want to send us message? Contact Us' />
          </div>
          <form action="" className='grid gap-y-3 p-5 border rounded shadow'>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Fullname</span>
              </label>
              <input type="text" placeholder="Fullname" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="Email" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea className="textarea textarea-bordered" placeholder="Enter your message"></textarea>
            </div>

            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </Layout>
    </>
  )
}

export default ContactUs;