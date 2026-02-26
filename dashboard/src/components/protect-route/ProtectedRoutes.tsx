import { useAuthContext } from "@/context/AuthContext";
import { type FC } from "react";
import { Navigate } from "react-router-dom";
interface RouteProtect {
    children: React.ReactNode
    allowedRoles: string[]
}
const ProtectedRoute: FC<RouteProtect> = ({ children, allowedRoles }) => {
    const { auth, authLoading, userRoles, docLoading } = useAuthContext();

    if (authLoading || docLoading) return <p>Loading...</p>;

    if (!auth) return <Navigate to="/login" />;

    if (
        allowedRoles && !allowedRoles.some((role: string) => userRoles.includes(role))
    ) {
        return <Navigate to="/dashboard/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;