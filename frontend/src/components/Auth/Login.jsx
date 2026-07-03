import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        // Handle your login logic here (e.g., console.log strings or API calls)
        setEmail("");
        setPass("");
    }

    return (
        <div className='flex min-h-screen w-full items-center justify-center p-4 bg-slate-50'>
            {/* Main Container matching the dashboard aesthetic */}
            <div className='w-full max-w-md bg-purple-200 p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-md'>
                <h2 className='text-3xl font-extrabold text-center mb-6 text-zinc-800 tracking-tight'>
                    Welcome <span className='text-purple-700 px-1 rounded-md'>Back</span>
                </h2>

                {/* Form layout: Matching inner purple wrapper container */}
                <form 
                    onSubmit={submitHandler} 
                    className='flex flex-col gap-4 bg-purple-400 p-5 sm:p-6 rounded-xl border border-zinc-200 shadow-inner'
                >
                    <div className='w-full'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            type='email' 
                            placeholder='Enter email' 
                            className='w-full text-base p-3 border-zinc-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-purple-100 placeholder:text-zinc-400 shadow-sm'
                        />
                    </div>

                    <div className='w-full'>
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                            type='password' 
                            placeholder='Enter password' 
                            className='w-full text-base p-3 border-zinc-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-purple-100 placeholder:text-zinc-400 shadow-sm'
                        />
                    </div>

                    <button className='w-full bg-purple-700 hover:bg-purple-800 text-white p-3 rounded-lg text-base font-semibold transition-colors shadow-sm active:scale-[0.98] transform duration-100 cursor-pointer mt-2'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
