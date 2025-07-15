import Layout from "@/components/user/layout";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/public/NotFoundPage";
import UnauthorizedPage from "@/pages/public/UnauthorizedPage";
import { Route, Routes } from "react-router-dom";
import { PATH_ADMIN, PATH_PUBLIC, PATH_USER } from "@/routes/paths";
import SignInPage from "@/pages/authentication/SignInPage";
import SignUpCustomer from "@/pages/authentication/SignUpCustomer";
import SignUpOrganizer from "@/pages/authentication/SignUpOrganizer";
import VerifyEmailPage from "@/pages/authentication/VerifyEmailPage";
import AdminLayout from "@/components/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard/AdminPage";
import { RolesEnum } from "@/types/auth.types";
import AuthGuard from "@/auth/authGuard";
import CustomerCompleteProfile from "@/pages/authentication/CustomerCompleteProfile";
import CustomerProfilePage from "@/pages/user/customer/Profile/CustomerProfilePage";

const GlobalRouter = () => {
  return (
    <Routes>
      {/* Public Routes with User Layout */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={PATH_PUBLIC.signIn} element={<SignInPage />} />
        <Route path={PATH_PUBLIC.signUpCustomer} element={<SignUpCustomer />} />
        <Route
          path={PATH_PUBLIC.signUpOrganizer}
          element={<SignUpOrganizer />}
        />
        <Route path={PATH_PUBLIC.verifyEmail} element={<VerifyEmailPage />} />
        <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Member/Customer Protected Routes */}
      <Route element={<AuthGuard roles={[RolesEnum.MEMBER]} />}>
        <Route
          path={PATH_USER.completeProfile}
          element={<CustomerCompleteProfile />}
        />
        <Route
          path={PATH_USER.updateProfile}
          element={<CustomerProfilePage />}
        />
        <Route path={PATH_USER.tickets} element={<NotFoundPage />} />
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
  );
};

export default GlobalRouter;
