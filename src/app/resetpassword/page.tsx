import React from 'react'
import ResetComponent from '@/components/resetpassword'
import { Navbar1 } from '../navbar'
const page = () => {
  return (
    <div>
      <Navbar1/>
   <div className=" flex min-h-svh flex-col items-center justify-center">
                <div className="flex w-full max-w-sm flex-col gap-6">
                  <ResetComponent />
                </div>  
              </div>
              </div>
     
  )
}

export default page