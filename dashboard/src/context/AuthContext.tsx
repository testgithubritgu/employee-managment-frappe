import { useFrappeAuth, useFrappeGetDoc, type AuthCredentials, type AuthResponse } from 'frappe-react-sdk'
import React, { type ReactNode, type FC, createContext, useContext, useMemo, useCallback } from 'react'
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
    hasRole: () => (role: string) => boolean
    userRoles:string[]
}

const AuthContext = createContext<AppContext | undefined>(undefined)

// type User = string | null | undefined
type UserRole = string[]
const AuthContextProvider: FC<Props> = ({ children }) => {
    const { currentUser, isLoading: authLoading, login } = useFrappeAuth()
    const { data: userDetails, isLoading: docLoading } = useFrappeGetDoc(
        'User',
        currentUser ?? undefined
    );

    const userRoles: UserRole = useMemo(() => (
        userDetails?.roles?.map((role: any) => (
            role.role
        )) || []
    ), [userDetails])

    const hasRole = useCallback(() => {
        return (role: string) => {
            return userRoles.includes(role)
        }
    }, [userDetails])
console.log(userRoles)
    return (
        <AuthContext.Provider value={{ auth: currentUser ?? null, userRoles, hasRole, authLoading, login, userDetails: userDetails ?? null, docLoading }}>
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