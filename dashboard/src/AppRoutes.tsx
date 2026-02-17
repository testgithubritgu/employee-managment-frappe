import { Suspense, type JSX } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./features/login/Login"



type isRouteActive = boolean

type RouteConfig = Array<[string,JSX.Element,isRouteActive]>

const pageRoute:RouteConfig  = [
  ["/login",<Login /> ,true]
]

const AppRoutes = () => {
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
