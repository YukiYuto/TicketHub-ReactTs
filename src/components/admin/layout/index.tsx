import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import "@styles/admin/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-content">
        {/* TODO: Add Sidebar here */}
        {/* <Sidebar /> */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;