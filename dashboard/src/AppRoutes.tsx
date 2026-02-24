import { lazy, Suspense, useEffect, type JSX } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./features/login/Login"
import  FirebaseAuht from "./features/firbase-auth/login"
import { useFrappeAuth } from "frappe-react-sdk"
import Home from "./features/landing-page/Home"
import Attendance from "./features/employe-attendance/Attendance"
import PaginationDemo from "./features/pagination/PaginationDemo"

// load lazy 
const Navbar = lazy(() => import("./components/commen/Navbar")) 
const YtConverter = lazy(() => import("./features/yt-mp3/YtConverter")) 

type isRouteActive = boolean

type RouteConfig = Array<[string, JSX.Element, isRouteActive]>

const pageRoute: RouteConfig = [
  ["/dashboard/login", <Login />, true],
  ["/dashboard/firebase-login", <FirebaseAuht />, true],
  ["/dashboard", <Home />, true],
  ["/dashboard/attendance", <Attendance />, true],
  ["/dashboard/yt-mp3", <YtConverter/>, true],
  ["/dashboard/yt-mp3", <YtConverter/>, true],
  ["/dashboard/pagination", <PaginationDemo/>, true],
]

const AppRoutes = () => {
  const { isLoading, currentUser } = useFrappeAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoading) return
    const guestRoutes: string[] = ["/dashboard", "/dashboard/firebase-login"]
    if (!currentUser && !guestRoutes.includes(window.location.pathname)) {
      navigate("/dashboard/login")
    }
    navigate(window.location.pathname)
  }, [isLoading, currentUser])

  const disableNavbar:string[]  = [""]
  return (
    <Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>
      {!disableNavbar.includes(window.location.pathname) && <Navbar />}
      <Routes>
        <Route  path="*" element={<p>No Routes Available.........</p>}/>
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
