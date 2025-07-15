import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "@components/admin/AdminSidebar";
import "@styles/admin/AdminDashboard.css";
import "@styles/admin/AdminSidebar.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout with-sidebar">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          <main className="content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
