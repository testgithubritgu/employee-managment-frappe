import { lazy, Suspense, useEffect, type JSX } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useFrappeAuth } from "frappe-react-sdk"
import ProtectedRoute from "./components/protect-route/ProtectedRoutes"
import Navbar from "./components/commen/Navbar"

// load lazy
const Login = lazy(() => import("./features/login/Login"))
const FirebaseAuht = lazy(() => import("./features/firbase-auth/login"))
const Home = lazy(() => import("./features/landing-page/Home"))
const Attendance = lazy(() => import("./features/employe-attendance/Attendance"))
const PaginationDemo = lazy(() => import("./features/pagination/PaginationDemo"))
const UnAuthorized = lazy(() => import("./features/unauthorize/UnAuthorized"))
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
  const { pathname } = useLocation()

  useEffect(() => {
    if (isLoading) return
    const guestRoutes: string[] = ["/dashboard", "/dashboard/login", "/dashboard/firebase-login"]

    if (!currentUser && !guestRoutes.includes(pathname)) {
      navigate("/dashboard/login", { replace: true })
      return
    }

    if (currentUser && pathname === "/dashboard/login") {
      navigate("/dashboard", { replace: true })
    }
  }, [isLoading, currentUser, pathname, navigate])

  const disableNavbar: string[] = ["/dashboard/login", "/dashboard/firebase-login"]

  return (
    <Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>
      {!disableNavbar.includes(pathname) && <Navbar />}
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
