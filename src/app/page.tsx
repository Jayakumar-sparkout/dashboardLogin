import React from 'react'
import { RegisterForm } from '@/components/register'

const page = () => {
  return (
    
    <div className=" flex min-h-svh flex-col items-center justify-center mt-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm />
      </div>  
    </div>

   
  )
}

export default page