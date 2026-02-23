import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocList, type AuthCredentials, type AuthResponse } from 'frappe-react-sdk'
import React, { type ReactNode, type FC, createContext, useContext } from 'react'
type Props = { children: ReactNode }

interface UserDoc {
    full_name: string
    email: string
    user_roles: any[]
}

interface AppContext {
    setAuth?: React.Dispatch<React.SetStateAction<string>>
    auth?: string | null | undefined
    authLoading: boolean
    login: (credentials: AuthCredentials) => Promise<AuthResponse>
    userDetails: UserDoc | null
    docLoading: boolean
}

const AuthContext = createContext<AppContext | undefined>(undefined)

// type User = string | null | undefined

const AuthContextProvider: FC<Props> = ({ children }) => {

    const { currentUser, isLoading: authLoading, login } = useFrappeAuth()
    const { data: userDetails ,isLoading:docLoading} = useFrappeGetDoc(
        'User',
        currentUser ?? undefined
    );


    return (
        <AuthContext.Provider value={{ auth: currentUser ?? null, authLoading, login, userDetails: userDetails ?? null, docLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = (): AppContext => {
    
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Auth context must be used in Auth context provider")
    }
    return context
}

export default AuthContextProvider
