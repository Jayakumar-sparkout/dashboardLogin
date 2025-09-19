'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
import { useState } from "react"
import { json } from "stream/consumers"
 function ForgotVerify() {
    const [otp,setOtp] = useState<string|undefined>();
    const [email,setEmail] = useState<string|undefined>();
    const [emailErr,setEmailErr] =useState<boolean>(false);
    const [otpShow,setOtpShow] = useState<boolean>(false);
    const [userEmail,setUserEmail] = useState<string|undefined>();
    const [emailVerify,setEmailVerify] =useState<boolean>(false);
    const [sendBtn,setSendBtn] = useState<boolean>(false)
    const [btnShow,setBtnShow]=useState<boolean>(true);
    const [resOTP,setResOTP] = useState<string|undefined>();
    const router = useRouter()
    const handleSend = async(e:any)=>{
      e.preventDefault()
      setSendBtn(false)
      setEmailVerify(true)
      setBtnShow(false)
      try{
          const res = await fetch(`http://localhost:3001/users?email=${email}`,{
            method:'GET',
            headers:{
              'Content-type':'application/json'
            },
          
          })
          const resData = await res.json()

          if(!res.ok){
            throw new Error('response is Not Ok please check it')
          }

          console.log('responseData',resData)
          const data= resData[0]
          console.log('userotp',data.otp)
          setResOTP(data.otp)
        localStorage.setItem('userEmail',data.email)
        localStorage.setItem('UserID',data.id)
        setTimeout(()=>{
        setOtpShow(true)
        setSendBtn(true)
        setEmailVerify(false)
        toast("We've sent a verification code to your email address!", {
              position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      },4000)

         

      }catch(error:any){
        console.log('error',error.message)
        setTimeout(()=>{
           setOtpShow(false)
        setSendBtn(false)
        setEmailVerify(false)
        setBtnShow(true)
          toast("User Not Exist, Please Enter the Valid Email", {
                position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      },4000)
      }
    }

    const handleVerifyEmail = async(e:any)=>{
    e.preventDefault()
    console.log('hii')
      try{
        const ID = localStorage.getItem('UserID')
          const response = await fetch(`http://localhost:3001/users/${ID}`,{
            method:'GET',
            headers:{
              'Content-type':'application/json'
            },
          
          })

          const data = await response.json()

          if(data.otp == otp){

            console.log('inputOTP',otp)
              
            const isVerification = await fetch(`http://localhost:3001/users/${ID}`,{
              method:'PATCH',
              headers:{
                'Content-type':'application/json'
              },
              body: JSON.stringify({isVerified: true})
            })
              const data = await isVerification.json()
              console.log('response2',isVerification)
              console.log(data)
              if(!isVerification.ok){
                throw new Error('Enter the Valid OTP')
              }

                setEmailVerify(true)
                setSendBtn(false)
                  router.push('/resetpassword')
                setTimeout(()=>{
                  setEmailVerify(false)
                  setSendBtn(true)
                 
                toast("successfully verified your email", {
                      position:'top-right',
                description:'',
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            },4000)

          }else{
            setEmailVerify(true)
                setSendBtn(false)

                setTimeout(()=>{
                  setEmailVerify(false)
                  setSendBtn(true)
                
                toast("Enter the Valid OTP and Email!", {
                  position:'top-right',
                description:'',
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            },4000)
          }
      }catch(error:any){
            
              toast(error.message, {
                    position:'top-right',
                description:'',
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
          console.log('error',error.message)
      }
    }

  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We've sent a verification code to your email address. Enter the code below to confirm your identity.
        </p>
      </div>
      <form className="space-y-4">
        <div className="grid gap-3 mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e)=> {
                const data = e.target.value
                setEmail(data)
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const correct  = valid.test(data)

                if(!correct){
                  setEmailErr(true)
                }else{
                  setEmailErr(false)
                }
              }
              }
                  />
                  {emailErr===true &&(
              <span className="text-red-500">
                Enter the Valid Email Id
              </span>
                 )
                }
                </div>
         {otpShow && (       
        <div>
          <Label htmlFor="verification-code" className="mb-4">Verification Code</Label>      
                <InputOTP maxLength={6}
                value={otp}
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
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
                </InputOTP>
                     
                
         </div>
         )}

         {sendBtn && (
        
        <Button type="submit" className="w-full cursor-pointer " disabled={!email || emailErr ||!otp}
        onClick={(e)=> handleVerifyEmail(e)} >
          Verify Email
        </Button>
         )}
        
     {btnShow  &&(
        <Button  className="w-full cursor-pointer" onClick={(e)=> handleSend(e)} disabled={!email|| emailErr}>
          Send
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

export default ForgotVerify;
