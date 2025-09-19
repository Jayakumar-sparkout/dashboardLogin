'use client'
import { cn } from "@/lib/utils"
import '../app/globals.css'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { use, useEffect, useState } from "react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [regEmail,setRegEmail] = useState<string|undefined>()
    const [regFName,setRegFName] = useState<string|undefined>()
    const [regLName,setRegLName] = useState<string|undefined>()
    const [regPhone,setRegPhone] = useState<number|null>(null)
    const [regPassword,setRegPassword] = useState<string|undefined>()
    const [emailErr,setEmailErr] = useState<boolean>();
    const [phoneErr,setPhoneErr] = useState<boolean>();
    const [passErr,setPassErr] = useState<boolean>()
    const [regLoading,setRegLoading] = useState<boolean>()
    const [registerShow,setRegisterShow] = useState<boolean>(true)
    const [sonner,setSonner] = useState<boolean>(false)

   
 
    const router = useRouter()
    const preventInvalidChars = async(e:any)=> {
    const invalidChars = ["e", "E", "+", "-"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
      return false;
    }
    return true;
  }




  const handleRegister =async()=>{
    setRegLoading(true)
    setRegisterShow(false)
   const Otp = Math.floor(Math.random()*1000000)+1;
         console.log('otp',Otp)
try{
      
const result = await fetch('http://localhost:3001/users',{
  method:'POST',
  headers:{
    'Content-type':'application/type'
  },
 body:JSON.stringify({firstName:regFName,lastName:regLName,email:regEmail,phone:regPhone,password:regPassword,otp:Otp,isVerified:false})
})

if(result.ok){
  const data =result.json()
  console.log('registerData',data)
   router.push("/login")
  setTimeout(()=>{

  toast("Successfully Create the Account!", {
        position:'top-right',
          description: "Welcome ",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
  setRegisterShow(true)
  setRegEmail('')
  setRegFName('')
  setRegLName('')
  setRegPassword('')
  setRegPhone()
  setRegLoading(false)
 
  },4000)
}
}catch(error:any){
console.log('errorMessage',error.message)
    setTimeout(()=>{

  toast("something went wrong", {
         position:'top-right',
          description: "Welcome",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
  },4000)
}

  }
  return (
    <div className={cn("flex flex-col  gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              <div className="text-center item-center">
            Register Your Details
            </div>
            
        </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              {/* <div className="flex flex-col gap-4">
                </div> */}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="firstname">FirstName <span className="text-red-500">*</span></Label>
                 <Input
                  id="FirstName"
                  value={regFName}
                  onChange={(e) => {
                    const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, "");
                    setRegFName(onlyLetters);
                  }}
                  type="text"
                  placeholder="Enter the First Name..."
                  required
                />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastname">LastName</Label>
                  <Input
                id="LastName"
                value={regLName}
                onChange={(e) => {
                  const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, "");
                  setRegLName(onlyLetters);
                }}
                type="text"
                placeholder="Enter the Last Name..."
                required
              />
                </div>

                <div className="grid gap-3">
                <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    className={`no-spinner ${emailErr === true && 'border border-red-500 '}`}
                                    placeholder="m@example.com"
                                    value={regEmail}
                                    onChange={(e)=> {
                                const data = e.target.value
                                setRegEmail(data)
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
                        <p className="text-red-500">
                         Enter the Valid Email ID 
                        </p>
                          )
                        }
                                </div>
                                  
            <div className="grid gap-3">
              <Label htmlFor="username-1">Phone<span className="text-red-500">*</span></Label>
               <Input id="username-1"  className={`no-spinner  ${phoneErr === true && 'border border-red-500 '}`} name="phone"  placeholder="Enter the Phone no"
              type="number"
              onKeyDown={(e)=>preventInvalidChars(e)}
              value={regPhone ?? " "}
             onChange={(e) => {
            const value = e.target.value;

            setRegPhone(Number(value));
            if (value.length === 10 && /^\d{10}$/.test(value)) {
              setPhoneErr(false);
            } else {
              setPhoneErr(true);
            }
          }}

              />
               {phoneErr&&(
              <p className="text-red-500">
              Enter The Valid Phone no
              </p>
            )}


            </div>


              <div className="grid gap-3">
                
            
                  <div className="flex items-center">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                  </div>
                  <Input 
                  id="password" 
                  type="password" 
                  className={`no-spinner  ${passErr === true && 'border border-red-500 '}`}
                  placeholder="Enter the Password"
                  value={regPassword}
                  onChange={(e)=> {
                    const passValue = e.target.value;
                    setRegPassword(passValue)
                    if (passValue.length < 6){
                      setPassErr(true)
                    }else{
                      setPassErr(false)
                    }
                    
                    
                  }
                  }
                  required />
                     {passErr===true &&(
                        <p className="text-red-500">
                          Enter the Password Min 6 length
                        </p>
                          )
                          }
                </div>

                {registerShow && (
                <Button 
                type="submit"
                 className="w-full cursor-pointer no-spinner"
                 disabled={!regEmail || !regFName || !regPassword || !regPhone || emailErr===true || passErr===true || phoneErr===true}
                 onClick={handleRegister}
                >
                  Create Account
                </Button>
                
                )}

                <>
                <label className="text-sm items-center flex justify-center">  If you have an account please <Link href='/login' className="text-sm text-blue-400 ml-2">Login</Link></label>
                </>

                {regLoading && (
                              <div className="flex flex-col items-center justify-center gap-3 text-center">
                                {variants.map((variant) => (
                                  <div
                                    className="flex flex-col items-center justify-center gap-2"
                                    key={variant}
                                  >
                                    <Spinner variant={variant} />
                                    <span>please wait Your Registering...</span>
                                  </div>
                                  
                                ))}
                              </div>
                            )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
