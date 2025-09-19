import ForgotVerify from '@/components/forgotverify'
import React from 'react'
import { Toaster } from '@/components/ui/sonner'
//import { Navbar1 } from '../navbar'

const page = () => {
  return (
 
    <div className=" flex min-h-svh flex-col items-center justify-center ">
      
                 <div className="flex w-full max-w-sm flex-col gap-6">
                    <ForgotVerify/>
                   </div>
      </div>   
         
  )
}

export default page