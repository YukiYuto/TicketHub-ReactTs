import useAuth from "@hooks/useAuth.hook";
import Spinner from "@components/general/Spinner.tsx";
import { Navigate, Outlet } from "react-router-dom";
import { PATH_PUBLIC } from "@routes/paths";

interface IProps {
  roles: string[];
}

const AuthGuard = ({ roles }: IProps) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Spinner></Spinner>;
  }

  // If not authenticated, redirect to sign in
  if (!isAuthenticated) {
    return <Navigate to={PATH_PUBLIC.signIn} replace />;
  }

  // If authenticated but no user data, redirect to sign in
  if (!user) {
    return <Navigate to={PATH_PUBLIC.signIn} replace />;
  }

  // Check if user has required role
  const hasRequiredRole = user?.roles?.some((userRole: string) => 
    roles.includes(userRole)
  );

  // If user doesn't have required role, redirect to unauthorized
  if (!hasRequiredRole) {
    return <Navigate to={PATH_PUBLIC.unauthorized} replace />;
  }

  // User is authenticated and has required role
  return <Outlet />;
};

export default AuthGuard;
