import { lazy, Suspense, useEffect, type JSX } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./features/login/Login"
import FirebaseAuht from "./features/firbase-auth/login"
import { useFrappeAuth } from "frappe-react-sdk"
import Home from "./features/landing-page/Home"
import Attendance from "./features/employe-attendance/Attendance"
import PaginationDemo from "./features/pagination/PaginationDemo"
import ProtectedRoute from "./components/protect-route/ProtectedRoutes"
import UnAuthorized from "./features/unauthorize/UnAuthorized"

// load lazy 
const Navbar = lazy(() => import("./components/commen/Navbar"))
const YtConverter = lazy(() => import("./features/yt-mp3/YtConverter"))
const Calculator = lazy(() => import("./features/calculator/Calculator"))

type isRouteActive = boolean

type RouteConfig = Array<[string, JSX.Element, isRouteActive ,string[]?]>

const pageRoute: RouteConfig = [
  ["/dashboard/login", <Login />, true  ],
  ["/dashboard/firebase-login", <FirebaseAuht />, true],
  ["/dashboard", <Home />, true, ["Administrator"]],
  ["/dashboard/attendance", <Attendance />, true],
  ["/dashboard/yt-mp3", <YtConverter />, true, ["Administrator"]],
  ["/dashboard/pagination", <PaginationDemo />, true],
  ["/dashboard/Calculator", <Calculator />, true],
  ["/dashboard/unauthorized", <UnAuthorized />, true],
]

const AppRoutes = () => {
  const { isLoading, currentUser } = useFrappeAuth()
  const navigate = useNavigate()
  console.log('before current user..............................')
  useEffect(() => {
    if (isLoading) return
    const guestRoutes: string[] = ["/dashboard", "/dashboard/firebase-login",]
    if (!currentUser && !guestRoutes.includes(window.location.pathname) ) {
      navigate("/dashboard/login")
    }
    if (currentUser && window.location.pathname === "/dashboard/login"){
      navigate("/dashboard")
    }
    navigate(window.location.pathname)
  }, [isLoading, currentUser])

  const disableNavbar: string[] = [""]
  console.log('after current user..............................')
  return (
    <Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>
      {!disableNavbar.includes(window.location.pathname) && <Navbar />}
      <Routes>
        <Route path="*" element={<p>No Routes Available.........</p>} />
        {pageRoute.map(
          ([path, element, isRouteActive, roles]) =>
            isRouteActive && (
              <Route
                key={path}
                path={path}
                element={  Array.isArray(roles) ? <ProtectedRoute allowedRoles={roles}>
                  {element }
                </ProtectedRoute> : element}
              />
            )
        )}
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
