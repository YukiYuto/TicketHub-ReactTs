import { useRoleBasedFeature, useRoleBasedAction } from "./useRoleBasedHooks";
import { RolesEnum } from "@/types/auth.types";
import axiosInstance from "@/utils/axios/axiosInstance";

// Admin-specific hooks
export const useAdminDashboard = () => {
  return useRoleBasedFeature(async () => {
    const response = await axiosInstance.get("/admin/dashboard");
    return response.data;
  }, [RolesEnum.ADMIN]);
};

export const useAdminUserManagement = () => {
  return useRoleBasedFeature(async () => {
    const response = await axiosInstance.get("/admin/users");
    return response.data;
  }, [RolesEnum.ADMIN]);
};

export const useAdminActions = () => {
  const banUser = useRoleBasedAction(
    async (userId: string) => {
      const response = await axiosInstance.post(`/admin/users/${userId}/ban`);
      return response.data;
    },
    [RolesEnum.ADMIN]
  );

  const deleteUser = useRoleBasedAction(
    async (userId: string) => {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return response.data;
    },
    [RolesEnum.ADMIN]
  );

  return { banUser, deleteUser };
};
