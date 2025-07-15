import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth.hook";
import {
  PATH_PUBLIC,
  PATH_ADMIN,
  PATH_ORGANIZATION,
  PATH_USER,
} from "@/routes/paths";
import { RolesEnum } from "@/types/auth.types";

/**
 * Component để handle navigation sau khi authentication
 * Sử dụng sau khi SignIn thành công
 */
const AuthNavigationHandler = () => {
  const { isAuthenticated, getPrimaryRole, user, isFullInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate(PATH_PUBLIC.unauthorized);
      return;
    }

    const primaryRole = getPrimaryRole();

    // Check if MEMBER role needs to complete profile
    if (primaryRole === RolesEnum.MEMBER && !isFullInfo) {
      navigate(PATH_USER.completeProfile);
      return;
    }

    // Navigate based on primary role for completed profiles
    switch (primaryRole) {
      case RolesEnum.ADMIN:
        navigate(PATH_ADMIN.dashboard);
        break;
      case RolesEnum.ORGANIZATION:
        navigate(PATH_ORGANIZATION.home);
        break;
      case RolesEnum.MEMBER:
      default:
        navigate(PATH_PUBLIC.home);
        break;
    }
  }, [isAuthenticated, user, getPrimaryRole, isFullInfo, navigate]);

  return null;
};

export default AuthNavigationHandler;
