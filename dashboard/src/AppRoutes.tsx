import { Suspense, useEffect, type JSX } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./features/login/Login"
import { useFrappeAuth } from "frappe-react-sdk"



type isRouteActive = boolean

type RouteConfig = Array<[string, JSX.Element, isRouteActive]>

const pageRoute: RouteConfig = [
  ["/login", <Login />, true]
]



const AppRoutes = () => {
  const { isLoading, currentUser } = useFrappeAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoading) return
    const guestRoutes: string[] = ["/"]
    if (!currentUser && !guestRoutes.includes(window.location.pathname)) {

      navigate("/login")
    }
    navigate(window.location.pathname)
  }, [isLoading, currentUser])
  return (
    <Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>

      <Routes>
        {pageRoute.map(
          ([path, element, isRouteActive]) =>
            isRouteActive && (
              <Route
                key={path}
                path={path}
                element={element}
              />
            )
        )}
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
