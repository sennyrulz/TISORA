import React from 'react'
import { useState, useEffect } from 'react'
import success from '../assets/ok.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const emailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/${param.id}/verify/${param.token}`
                const {data} = await axios.get(url);
                console.log(data);
                setValidUrl(true)
            } catch (error) {
                console.log(error)
                setValidUrl(false)
            }
        };
        verifyEmailUrl()
    },[param])

  return (
    <div>
        <>
          {validUrl ? (
            <div className='styles.container'>
                <img src={success} alt='success image' />
                <h1>Email verified successfully</h1>
                <Link to= "/login">
                  <button style={{
                    backgroundColor: '#91443f'}} 
                    className="btn" 
                    // onClick={() => {
                    // dispatch(logout());
                    //  navigate("/login");}}
                    >
                        Login
                    </button>
                </Link>
            </div>
          ): (
            <h1> 404 Not Found </h1>
          )}
        </>
    </div>
  )
}

export default emailVerify
