import { useRoleBasedFeature, useRoleBasedAction } from "./useRoleBasedHooks";
import { RolesEnum } from "@/types/auth.types";
import axiosInstance from "@/utils/axios/axiosInstance";

// Customer-specific hooks
export const useCustomerProfile = () => {
  return useRoleBasedFeature(async () => {
    const response = await axiosInstance.get("/customer/profile");
    return response.data;
  }, [RolesEnum.MEMBER]);
};

export const useCustomerTickets = () => {
  return useRoleBasedFeature(async () => {
    const response = await axiosInstance.get("/customer/tickets");
    return response.data;
  }, [RolesEnum.MEMBER]);
};

export const useCustomerActions = () => {
  const updateProfile = useRoleBasedAction(
    async (profileData: any) => {
      const response = await axiosInstance.put(
        "/customer/profile",
        profileData
      );
      return response.data;
    },
    [RolesEnum.MEMBER]
  );

  const bookTicket = useRoleBasedAction(
    async (eventId: string, ticketData: any) => {
      const response = await axiosInstance.post(
        `/events/${eventId}/book`,
        ticketData
      );
      return response.data;
    },
    [RolesEnum.MEMBER]
  );

  return { updateProfile, bookTicket };
};
