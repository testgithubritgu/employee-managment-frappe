import { useState } from "react";
import { Button } from "../../components/ui/button"
import { signup } from "./config"


const Login = () => {
    const [error, setError] = useState<string>("");
    const onSubmit =async()=>{
       const  result = await signup("swapnilraut1698@gmail.com",'1234576')
       
        if(!result.success){
            setError(result.message)

        }else{
            alert("congratulations user created succesfully")
        }
    }
  return (
    <div>
        {error && <p className="text-red-500">
            {error}
            </p>}
      sign into firebase
          <Button onClick={() => onSubmit()} >
        Sign Up User
      </Button>
    </div>
  )
}

export default Login
