import { useFrappeAuth, type AuthCredentials, type AuthResponse } from 'frappe-react-sdk'
import  React, {type ReactNode, type FC, createContext, useState, useEffect, useContext } from 'react'
type Props = {children:ReactNode}

interface AppContext {
    setAuth?:React.Dispatch<React.SetStateAction<string>>
    auth?: string | null | undefined
    authLoading: boolean
    login: (credentials: AuthCredentials) => Promise<AuthResponse>
}

const AuthContext = createContext<AppContext | undefined>(undefined)

type User = string | null | undefined

const AuthContextProvider:FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<User | null >(null)
    const {currentUser , isLoading:authLoading , login} = useFrappeAuth()
   
    useEffect(() => {
        setAuth(currentUser ?? null)
    }, [currentUser])
  return (
      <AuthContext.Provider value={{ auth, authLoading, login }}>
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
// this is without trash 
// i want this trash 