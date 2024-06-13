"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {

    const router = useRouter()

    const logout = async () => {
        try {

            await axios.get('/api/users/logout')

            toast.error("Don't leave me ",{icon:'🥲🥺'})
            
            console.log('Logout successfully');
            
            router.push('/login')
            
        } catch (error) {
            console.log('Logout failed 🥲');
            
        }
    }

    const [user,setUser]: any = React.useState({})

    const getUserDetails = async () => {

        try {
            

        const res = await axios.get('/api/users/me')

        console.log(res);

        setUser(res.data.user)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[])

    return (
        <main className="w-full h-full flex flex-col items-center justify-center">

            <h1 className=" text-cyan-500 text-3xl mt-32">Profile page</h1>

            {user && 
            <>
                <h2 className="my-20 text-4xl font-semibold text-amber-300">Welcome {user?.username} 😍</h2>
                
                <Link href={`/profile/${user?._id}`}>Go to your profile 😎</Link>
            </>}

            <button onClick={logout} className=" mt-32 px-5 py-2 bg-red-500 text-white rounded active:scale-95 transition-all">Logout</button>

        </main>
    )
}