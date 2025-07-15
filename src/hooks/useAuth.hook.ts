import { useContext } from "react";
import { AuthContext } from "@auth/auth.context";
import { RolesEnum, type IRoles } from "@/types/auth.types";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext context is not inside of AuthProvider Tag");
  }

  // Role checking utilities
  const hasRole = (role: IRoles): boolean => {
    return context.user?.roles?.includes(role) ?? false;
  };

  const hasAnyRole = (roles: IRoles[]): boolean => {
    return roles.some((role) => hasRole(role));
  };

  const hasAllRoles = (roles: IRoles[]): boolean => {
    return roles.every((role) => hasRole(role));
  };

  // Role-specific checks
  const isAdmin = (): boolean => hasRole(RolesEnum.ADMIN);
  const isMember = (): boolean => hasRole(RolesEnum.MEMBER);
  const isOrganization = (): boolean => hasRole(RolesEnum.ORGANIZATION);
  const isStaff = (): boolean => hasRole(RolesEnum.STAFF);

  // Get primary role (first role in array)
  const getPrimaryRole = (): IRoles | undefined => {
    return context.user?.roles?.[0] as IRoles;
  };

  // Check if user can access a specific feature
  const canAccess = (requiredRoles: IRoles[]): boolean => {
    if (!context.isAuthenticated) return false;
    return hasAnyRole(requiredRoles);
  };

  return {
    ...context,
    // Role utilities
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isMember,
    isOrganization,
    isStaff,
    getPrimaryRole,
    canAccess,
  };
};

export default useAuth;
