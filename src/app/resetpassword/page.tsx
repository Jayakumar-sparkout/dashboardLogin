import React from 'react'
import { Toaster } from '@/components/ui/sonner'
import ResetComponent from '@/components/resetpassword'

const page = () => {
  return (
    <div>
      
   <div className=" flex min-h-svh flex-col items-center justify-center">
    <Toaster position="top-right" />
                <div className="flex w-full max-w-sm flex-col gap-6">
                  <ResetComponent />
                </div>  
              </div>
              </div>
     
  )
}

export default page