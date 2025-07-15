// Main auth hook
export { default as useAuth } from "./useAuth.hook";

// Generic role-based hooks
export { useRoleBasedFeature, useRoleBasedAction } from "./useRoleBasedHooks";

// Domain-specific hooks
export {
  useAdminDashboard,
  useAdminUserManagement,
  useAdminActions,
} from "./useAdminHooks";
export {
  useCustomerProfile,
  useCustomerTickets,
  useCustomerActions,
} from "./useCustomerHooks";
export {
  useOrganizationEvents,
  useOrganizationDashboard,
  useOrganizationActions,
} from "./useOrganizationHooks";
