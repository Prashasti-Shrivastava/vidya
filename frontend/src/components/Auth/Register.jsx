import React from 'react'
import { useState } from 'react';

const Register = () => {
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [name,setName]=useState("");
    const [userName,setUserName]=useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        setEmail("");
        setPass("");
    }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='border-4 border-blue-400 p-8 rounded-xl bg-amber-100 '>
        <form onSubmit={(e)=>{
            submitHandler(e);
        }} className='flex flex-col items-center justify-center'>
        <input
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
         required type='email' placeholder='enter email' className='border-2 outline-none bg-transparent placeholder:text-gray-500 border-blue-400 rounded-full py-4 px-6 text-xl min-w-[330px]'>
        </input>

        <input
        value={name}
        onChange={(e)=>{
            setName(e.target.value)
        }}
         required type='text' placeholder='enter your name' className='border-2 outline-none bg-transparent placeholder:text-gray-500 border-blue-400 rounded-full py-4 px-6 text-xl min-w-[330px] mt-3'>
        </input>

        <input
        value={userName}
        onChange={(e)=>{
            setUserName(e.target.value)
        }}
         required type='text' placeholder='enter username' className='border-2 outline-none bg-transparent placeholder:text-gray-500 border-blue-400 rounded-full py-4 px-6 text-xl min-w-[330px] mt-3'>
        </input>

        <input
        value={pass}
        onChange={(e)=>{
            setPass(e.target.value)
        }}
         type='password' placeholder='set password'   className='border-2 outline-none bg-transparent placeholder:text-gray-500 border-blue-400 rounded-full py-4 px-6 text-xl mt-3 min-w-[330px]'>
        </input>

        <button  className='border-2 outline-none  placeholder:text-gray-500 border-blue-400 rounded-xl py-4 px-6 text-xl mt-5 text-white bg-blue-400 min-w-[330px]' >Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register
 