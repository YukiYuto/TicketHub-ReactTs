import useAuth from "@hooks/useAuth.hook";
import Spinner from "@components/general/Spinner.tsx";
import { Navigate, Outlet } from "react-router-dom";
import { PATH_PUBLIC } from "@routes/paths";

interface IProps {
  roles: string[];
}

const AuthGuard = ({ roles }: IProps) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();

  // Check access to decide which component will be rendered.
  const hasAccess =
    isAuthenticated && user?.roles?.find((x: string) => roles.includes(x));

  if (isAuthLoading) {
    return <Spinner></Spinner>;
  }

  return hasAccess ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={PATH_PUBLIC.unauthorized}></Navigate>
  );
};

export default AuthGuard;
