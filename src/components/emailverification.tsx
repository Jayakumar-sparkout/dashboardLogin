'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
import { toast } from "sonner"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"

 function EmailVerify() {
    const [otp,setOtp] = useState<number|null>();
    const [emailVerify,setEmailVerify] =useState<boolean>(false)
    let verifyTrue = true;

    const router = useRouter()

 
    
  const handleEmailVerify = async (e: any) => {
  e.preventDefault();
  console.log('otp',otp)
  setEmailVerify(true)
  try {
    const ID = localStorage.getItem("loginId");
    console.log("ID", ID);

    const res = await fetch(`http://localhost:3001/users/${ID}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("response1 Error");

    }

    const data = await res.json();
    console.log("finialData", data);

    if (data.otp == otp) {
      const updateRes = await fetch(`http://localhost:3001/users/${ID}`, {
        method: "PATCH", 
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({isVerified: true }), 
      });

      const updateData = await updateRes.json();
      console.log("finialRes2", updateData);
      localStorage.setItem('userEmail',updateData.email)
       router.push('/dashboard')
      setTimeout(()=>{
       
      toast("Successfully verified email!", {
            position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      
       setEmailVerify(false)
        
      },4000)
    
    } else {
      setEmailVerify(false)
        toast("Invalid OTP!", {
              position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
    }
  } catch (error: any) {

    setTimeout(()=>{
      setEmailVerify(false)
    console.error("Error:", error.message);
    setEmailVerify(false)
    toast("User Not Exist", {
          position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })

      },4000)
  }
};




  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We've sent a verification code to your email address. Enter the code below to confirm your identity.
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <Label htmlFor="verification-code " className="mb-5">Verification Code</Label>      
               <InputOTP maxLength={6}
                value={otp}
                className="mt-5"
                onChange={(value) => {
                const onlyNumbers = value.replace(/[^0-9]/g, "");
                setOtp(onlyNumbers);
              }}
              type="text"
              inputMode="numeric"
                >


                <InputOTPGroup>
                    <InputOTPSlot index={0}
                    />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2}   />
                    <InputOTPSlot index={3}  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5}  />
                </InputOTPGroup>
                </InputOTP>
             


                     
                
         </div>
         {emailVerify===false && (
        <Button  className="w-full cursor-pointer"
        onClick={(e)=> handleEmailVerify(e)
         
        }
        disabled={otp?.toString().length !== 6}
         >
          Verify Email
        </Button>
         )}
        {emailVerify === true && (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            {variants.map((variant) => (
              <div
                className="flex flex-col items-center justify-center gap-2"
                key={variant}
              >
                <Spinner variant={variant} />
                <span>please wait..</span>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default EmailVerify;