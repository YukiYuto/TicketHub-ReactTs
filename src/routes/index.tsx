import Layout from "@/components/user/layout";
import NotFoundPage from "@/pages/public/NotFoundPage";
import UnauthorizedPage from "@/pages/public/UnauthorizedPage";
import { Route, Routes } from "react-router-dom";
import { PATH_ADMIN, PATH_PUBLIC, PATH_USER } from "@/routes/paths";
import { RolesEnum } from "@/types/auth.types";
import AuthGuard from "@/auth/authGuard";
import AdminLayout from "@/components/admin/layout";
import { Suspense, lazy } from "react";
import "@/styles/loading.css";

// Lazy load components
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const SignInPage = lazy(() => import("@/pages/authentication/SignInPage"));
const SignUpCustomer = lazy(
  () => import("@/pages/authentication/SignUpCustomer")
);
const SignUpOrganizer = lazy(
  () => import("@/pages/authentication/SignUpOrganizer")
);
const VerifyEmailPage = lazy(
  () => import("@/pages/authentication/VerifyEmailPage")
);
const CustomerCompleteProfile = lazy(
  () => import("@/pages/authentication/CustomerCompleteProfile")
);
const CustomerProfilePage = lazy(
  () => import("@/pages/user/customer/Profile/CustomerProfilePage")
);
const EventPage = lazy(() => import("@/pages/public/event/EventPage"));
const TicketPage = lazy(() => import("@/pages/public/tickets/TicketPage"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard/AdminPage"));

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <span className="loading-text">Đang tải...</span>
  </div>
);

const GlobalRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes with User Layout */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={PATH_PUBLIC.signIn} element={<SignInPage />} />
          <Route
            path={PATH_PUBLIC.signUpCustomer}
            element={<SignUpCustomer />}
          />
          <Route
            path={PATH_PUBLIC.signUpOrganizer}
            element={<SignUpOrganizer />}
          />
          <Route path={PATH_PUBLIC.verifyEmail} element={<VerifyEmailPage />} />
          <Route path={PATH_PUBLIC.eventPage} element={<EventPage />} />
          <Route path={PATH_PUBLIC.ticketPage} element={<TicketPage />} />
          <Route
            path={PATH_PUBLIC.unauthorized}
            element={<UnauthorizedPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Member/Customer Protected Routes */}
        <Route element={<AuthGuard roles={[RolesEnum.MEMBER]} />}>
          <Route element={<Layout />}>
            <Route path={PATH_USER.profile} element={<CustomerProfilePage />} />
            <Route
              path={PATH_USER.updateProfile}
              element={<CustomerProfilePage />}
            />
            <Route path={PATH_USER.tickets} element={<NotFoundPage />} />
          </Route>
          <Route
            path={PATH_USER.completeProfile}
            element={<CustomerCompleteProfile />}
          />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AuthGuard roles={[RolesEnum.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            {/* Redirect /admin to /admin/dashboard */}
            <Route path={PATH_ADMIN.dashboard} element={<AdminDashboard />} />
            <Route path="/admin/users" element={<NotFoundPage />} />
            <Route path="/admin/events" element={<NotFoundPage />} />
            <Route path="/admin/tickets" element={<NotFoundPage />} />
            <Route path="/admin/transactions" element={<NotFoundPage />} />
            <Route path="/admin/analytics" element={<NotFoundPage />} />
            <Route path="/admin/settings" element={<NotFoundPage />} />
            <Route path="/admin/updates" element={<NotFoundPage />} />
            <Route path="/admin/products" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default GlobalRouter;
