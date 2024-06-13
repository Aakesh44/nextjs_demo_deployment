"use client"

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {

    const router = useRouter();

    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const [loading, setloading] = React.useState(false);

    const onSignup = async () => {
        
        try {

            setloading(true)

            const response = await axios.post('/api/users/signup', user)

                        toast.success('hii');

            console.log('Signup successfully :',response);


            // router.push('/login')

        } catch (error: any) {

            console.log('Signup failed :',error);
            
            toast.error(error?.response?.data?.error)

        } finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
            setbuttonDisabled(false)
        }
        else{
            setbuttonDisabled(true)
        }
    },[user])

    return(
        <main>
            <h1 className=" text-cyan-500 text-3xl text-center mt-32">Signup page</h1>

            <section className="w-2/3 h-96 mx-auto my-5 p-5 text-white flex flex-col justify-center items-center gap-2 border border-cyan-200 rounded-md">

                <label htmlFor="username">Username</label>
                <input 
                    type="text" id="username"
                    value={user?.username}
                    onChange={(e)=>setUser({...user,username: e.target.value})}
                    className="h-10 w-full px-10 outline-none border border-white text-black"/>

                <label htmlFor="email">Email</label>
                <input 
                    type="text" id="email"
                    value={user?.email}
                    onChange={(e)=>setUser({...user,email: e.target.value})}
                    className="h-10 w-full px-10 outline-none border border-white text-black"/>
                    
                <label htmlFor="password">Password</label>
                <input 
                    type="text" id="password"
                    value={user?.password}
                    onChange={(e)=>setUser({...user,password: e.target.value})}
                    className="h-10 w-full px-10 outline-none border border-white text-black"/> 

                <button onClick={onSignup} disabled={buttonDisabled} className="h-10 w-full rounded bg-teal-400 active:scale-95 transition-all">{loading ?  'Loading...' : buttonDisabled ? 'fill the form' : 'Signup here'}</button>

                <Link href={'/login'} className="text-blue-500 hover:underline">go to login</Link>
            </section>
        </main>
    )
}