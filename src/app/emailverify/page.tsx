import EmailVerify from '@/components/emailverification'
import React from 'react'


const page = () => {
  return (

    <div className=" flex min-h-svh flex-col items-center justify-center ">
             <div className="flex w-full max-w-sm flex-col gap-6">
               <EmailVerify/>
             </div>
    </div>
  )
}

export default page