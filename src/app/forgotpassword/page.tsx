"use client"

import { sendEmail } from '@/helpers/mailer2';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ForgotPassword (){

  const router = useRouter();

  const [email, setEmail] = useState('');

  const [tokenSend, settokenSend] = useState(false);

  const [data,setData] = useState({
      token:"",
      password:"",
  })

  const handleSendToken = async() => {

    try {

      if(!email) {return}

      const res = await axios.post('/api/users/forgotpassword',{email})

      console.log(res);
      
      settokenSend(true)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    const tokenFromUrl = window.location.search.split("=")[1]

    setData({...data,token : tokenFromUrl || ""})
  },[])

  const handleResetPassword = async() => {
    try {

      if(!data?.token || !data?.password) {return}

      try {

        const res = await axios.put('/api/users/resetpassword',
          {
            token : data?.token,
            password: data?.password
          }
        )

        console.log(res);

        router.push('/login')
        
      } catch (error) {
        console.log(error);
        
      }

      
    } catch (error) {
      console.log(error);
      
    }
  }  

  return (
    <main className=" w-full min-h-screen flex flex-col items-center justify-center gap-4">

      {!data.token ? 

        <section className="w-2/3 h-96 mx-auto my-5 p-5 text-white flex flex-col justify-center items-center gap-2 border border-cyan-200 rounded-md">
            <label htmlFor="email">Email</label>
            <input 
                type="text" id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value.trim())}
                className="h-10 w-full px-10 outline-none border border-white text-black"/> 

            <button onClick={handleSendToken} className="h-10 w-full rounded bg-teal-400 active:scale-95 transition-all">Send Token</button>        
        </section>:<>



        <h1 className=" text-cyan-500 text-3xl text-center mt-32">RESET PASSWORD</h1>

        <section className="w-2/3 h-96 mx-auto my-5 p-5 text-white flex flex-col justify-center items-center gap-2 border border-cyan-200 rounded-md">

            <label htmlFor="token">Token</label>
            <input 
                type="text" id="token" readOnly
                value={data?.token}
                className="h-10 w-full px-10 outline-none border border-white text-black"/>
                
            <label htmlFor="password">New Password</label>
            <input 
                type="text" id="password"
                value={data?.password}
                onChange={(e)=>setData({...data,password: e.target.value})}
                className="h-10 w-full px-10 outline-none border border-white text-black"/> 

            <button onClick={handleResetPassword} className="h-10 w-full rounded bg-teal-400 active:scale-95 transition-all">Reset password</button>

            <Link href={'/login'} className="text-blue-500 hover:underline">go to login</Link>
        </section>

      </>}
    </main>
  )
}
