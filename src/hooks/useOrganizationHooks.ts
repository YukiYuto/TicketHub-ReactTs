import { useRoleBasedFeature, useRoleBasedAction } from "./useRoleBasedHooks";
import { RolesEnum } from "@/types/auth.types";
import axiosInstance from "@/utils/axios/axiosInstance";

// Organization-specific hooks
export const useOrganizationEvents = () => {
  return useRoleBasedFeature(async () => {
    const response = await axiosInstance.get("/organization/events");
    return response.data;
  }, [RolesEnum.ORGANIZATION]);
};

export const useOrganizationDashboard = () => {
  return useRoleBasedFeature(async () => {
    const response = await axiosInstance.get("/organization/dashboard");
    return response.data;
  }, [RolesEnum.ORGANIZATION]);
};

export const useOrganizationActions = () => {
  const createEvent = useRoleBasedAction(
    async (eventData: any) => {
      const response = await axiosInstance.post(
        "/organization/events",
        eventData
      );
      return response.data;
    },
    [RolesEnum.ORGANIZATION]
  );

  const updateEvent = useRoleBasedAction(
    async (eventId: string, eventData: any) => {
      const response = await axiosInstance.put(
        `/organization/events/${eventId}`,
        eventData
      );
      return response.data;
    },
    [RolesEnum.ORGANIZATION]
  );

  const deleteEvent = useRoleBasedAction(
    async (eventId: string) => {
      const response = await axiosInstance.delete(
        `/organization/events/${eventId}`
      );
      return response.data;
    },
    [RolesEnum.ORGANIZATION]
  );

  return { createEvent, updateEvent, deleteEvent };
};
