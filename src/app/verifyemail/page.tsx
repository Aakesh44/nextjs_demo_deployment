"use client";

import axios from "axios";
import Link from "next/link";
import React,{useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);


    const verifyUserEmail = async() => {

        try {

            await axios.post('/api/users/verifyemail',
                {token}
            )

            setVerified(true)
            
        } catch (error: any) {

            console.log(error);

            setError(true)
            
            toast.error(error?.response?.data?.error)
        }
    }

    // getting token form url
    useEffect(()=>{
        const urlToken = window.location.search?.split("=")[1]
        setToken(urlToken || "")
    },[])

    // call fun when get the token
    useEffect(()=>{
        if(token?.length > 0) {
            verifyUserEmail()
        }
    },[token])

    return (
        <main className=" w-full min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className=" text-3xl">Verify token</h1>
            <h2 className=" text-2xl font-semibold max-w-48 break-words">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="mb-3">Email verified</h2>
                    <Link href={"/login"}>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-3xl text-red-600 font-semibold">Error</h2>
                </div>
            )}            
        </main>
    )
}