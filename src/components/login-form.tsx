'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import '../app/globals.css'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextRequest } from "next/server"
import { Toaster } from "./ui/sonner"
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
import { useEffect, useState } from "react"




interface LoginFormProps extends React.ComponentProps<"div"> {
  setLoginData: React.Dispatch<React.SetStateAction<string | null>>;
}

 export function LoginForm({ setLoginData, className, ...props }: LoginFormProps) {
  const router = useRouter()
  const [email,setEmail] = useState<string|undefined>()
  const [password,setPassword] = useState<string|undefined>()
  const [emailErr,setEmailErr] = useState<boolean>()
  const [passErr,setPassErr] = useState<boolean>()
  const [loginLoading,setLoginLoading] = useState<boolean>(false)
  const [showLogin,setShowLogin] = useState<boolean>(true)
  const [loginName,setLoginName] = useState<string|undefined>(undefined)




 const handleLogin = async (e: any) => {
  setShowLogin(false);
  setLoginLoading(true);

  try {
    const res = await fetch(
      `http://localhost:3001/users?email=${email}&password=${password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // if (!res.ok) {
    //   throw new Error("Failed to connect to server");
    // }
    const data = await res.json();

     if(data.length===0){
     
      toast("Please Enter the Correct Email and Password", {
            position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        }
      )
      setShowLogin(true);
      setLoginLoading(false);
    
    }

  

     const resId = data[0]
     localStorage.setItem('loginId',resId.id)
     console.log('resID',resId.id)
     console.log('response isverify',resId.isVerified)

    

    if(resId.isVerified==false){


      setTimeout(()=>{

         toast("Plz verify the EmailID!", {
              position:'top-right',
          description:'',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        setLoginLoading(false)
       setShowLogin(true)
        console.log('plz verify email',resId.isVerified)
        throw new Error('plz verify email')
        
      },4000)
      
    }

    console.log("API Response:", data);


    localStorage.setItem('loginUserId',resId.id)

     localStorage.setItem('loginName',resId.firstName)

     localStorage.setItem('loginEmail',resId.email)

     console.log(resId.firstName)

    console.log('loginUserId',resId.id)
      
  
if(resId.isVerified==true){

 document.cookie = `auth=users.${resId.id};`
    //  console.log('loginEmail',userEmail)

    //  if(!user.ok){
    //   throw new Error('something went wrong')
    //   setLoginLoading(false)
    //   setShowLogin(true)
    //  }


      router.push('/dashboard')
    setTimeout(() => {
      toast("User Login Successfully!", {
            position:'top-right',
          description: `Welcome `,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      setShowLogin(true);
      setEmail("");
      setPassword("")
      setLoginLoading(false);
    }, 4000);
}
  } catch (error: any) {


      console.log("error", error.message);
      setShowLogin(true);
      setLoginLoading(false);
   
   
  }

};

  return (
    <div className={cn("flex flex-col gap-6 mt-10", className)} {...props}>
       
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3 mb-0">
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

                   <div className="flex items-center">
                    <Link href='/emailverify' className="text-sm text-blue-500 hover:underline">Email Verify</Link>
                    <Link
                      href="/forgotVerify" 
                      className="ml-auto text-sm underline-offset-4 text-blue-500  hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>


                   {passErr===true &&(
                        <p className="text-red-500">
                          Enter the Password Max 6 length
                        </p>
                          )
                          }
                </div>


            {showLogin && (
  <Button
    disabled={!email || emailErr === true || !password || passErr === true}
    className="w-full cursor-pointer"
    onClick={(e) => handleLogin(e)}
  >
    Login
  </Button>
)}

{loginLoading && (
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

            


              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/" className="underline underline-offset-4 text-blue-500 ml-2 ">
                 <span>Sign up</span>
                </Link>
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

