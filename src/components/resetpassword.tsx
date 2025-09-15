'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
import { useRouter } from "next/navigation"
import { useState } from "react"
import { fa } from "zod/v4/locales"

 function ResetComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [email,setEmail] = useState<string|undefined>()
    const [emailErr,setEmailErr]=useState<boolean>(false)
    const [password,setPassword] = useState<string|undefined>();
    const [passErr,setPassErr] = useState<boolean>(false)
    const [confirmPassword,setConfirmPassword] =useState<string|undefined>()
    const [conPassErr,setConPassErr] = useState<boolean>(false)
    const [btnShow,setBtnShow] = useState<boolean>(true)
    const router = useRouter();
    const emailID = localStorage.getItem('userEmail')
    const handleResetPassword = async(e:any)=>{
      e.preventDefault()
      setBtnShow(false)
       if(password != confirmPassword){
        
            setBtnShow(false)
            setTimeout(()=>{
              setBtnShow(true)
             toast("Make sure both password are same!", {
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        }
      )  

            },4000)
        }
        const ID = localStorage.getItem('loginId')
        
       try{
       
       if(password===confirmPassword){
        const response = await fetch(`http://localhost:3001/users/${ID}`,{
          method:'PATCH',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({password:confirmPassword})
        })
        const data = await response.json()
        console.log('data',data)

        if(data.length===0){
          console.log('data length is zero')
          setTimeout(()=>{
                setBtnShow(true)
                
            toast("Something went wrong!", {
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        }
      )

          
        },4000)
          
       
        }
        console.log('response',data)
        setTimeout(()=>{
          setBtnShow(true)
            toast("Successfully update the password!", {
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        }
      )
      router.push('/login')
        },4000)
  }     
       }catch(error:any){
              setTimeout(()=>{
                
            toast("Something went wrong!", {
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        }
      )
      setBtnShow(true)
        },4000)
       }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
              </div>
              <div className="grid gap-6">
               <div className="grid gap-3 mb-0">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={emailID}
             
                  />
                  {emailErr===true &&(
              <span className="text-red-500">
                Enter the Valid Email Id
              </span>
                 )
                }
                </div>
               

                <div className="grid gap-3">
                  <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                  </div> 
                                  <Input 
                                  id="password" 
                                  type="password" 
                                  value={password}
                                  onChange={(e)=>{
                                    const passValue = e.target.value;
                                    setPassword(passValue)
                
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
                                          Enter the Password Max 6 length
                                        </p>
                                          )
                                          }
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Confirm Password</Label>
                  <div className="grid gap-3">
                        <Input
                                  id="password" 
                                  type="password" 
                                  value={confirmPassword}
                                  onChange={(e)=>{
                                    const passValue = e.target.value;
                                    setConfirmPassword(passValue)
                
                                    if (passValue.length < 6){
                                      setConPassErr(true)
                                    }else{
                                      setConPassErr(false)
                                    }
                                  }
                
                                  }
                
                
                                  required />
                
                
                                   {conPassErr===true &&(
                                        <p className="text-red-500">
                                          Enter the Password Max 6 length
                                        </p>
                                          )
                                          }
                </div>
                </div>
                {btnShow ===true  && (
                <Button type="submit" className="w-full cursor-pointer" disabled={ !password || passErr || !confirmPassword || conPassErr} onClick={(e)=>handleResetPassword(e)}>
                  Change
                </Button>
                )}
                {btnShow === false && (
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
              </div>
             
            </div>
          </form>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default ResetComponent