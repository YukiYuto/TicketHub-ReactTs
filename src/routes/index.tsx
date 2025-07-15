import Layout from "@/components/user/layout";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/public/NotFoundPage";
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Customer Routes */}
      <Route path={PATH_PUBLIC.home} element={<HomePage />} />
      <Route
        path={PATH_USER.completeProfile}
        element={<CustomerCompleteProfile />}
      />
      <Route path={PATH_USER.updateProfile} element={<CustomerProfilePage />} />
      <Route path={PATH_USER.tickets} element={<NotFoundPage />} />

      {/* Admin Routes */}
      <Route element={<AuthGuard roles={[RolesEnum.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path={PATH_ADMIN.dashboard} element={<AdminDashboard />} />
        </Route>
      </Route>
      <Route path={PATH_PUBLIC.verifyEmail} element={<VerifyEmailPage />} />
      <Route path={PATH_PUBLIC.unauthorized} element={<HomePage />} />
    </Routes>
  );
};

export default GlobalRouter;
