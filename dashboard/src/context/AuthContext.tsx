import { useFrappeAuth } from 'frappe-react-sdk'
import  React, {type ReactNode, type FC, createContext, useState, useEffect, useContext } from 'react'
type Props = {children:ReactNode}

interface AppContext {
    setAuth?:React.Dispatch<React.SetStateAction<string>>
    auth?:string
}

const AuthContext = createContext<AppContext | undefined>(undefined)

const AuthContextProvider:FC<Props> = ({ children }) => {
    const [auth , setAuth]  = useState<string>("")
    const {currentUser} = useFrappeAuth()
    useEffect(()=>{
        if(currentUser){
            setAuth(currentUser)
        }else{
            setAuth("")
        }
    },[currentUser])
  return (
    <AuthContext.Provider value={{auth}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = ():AppContext=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Auth context must be used in Auth context provider")
    }
    return context
}

export default AuthContextProvider
