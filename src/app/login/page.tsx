import { LoginForm } from '@/components/login-form'
import React from 'react'


const page = () => {

  return (

        <div className=" flex min-h-svh flex-col items-center justify-center mt-10">
             <div className="flex w-full max-w-sm flex-col gap-6">
               <LoginForm/>
             </div>  
           </div>

  )
}

export default page