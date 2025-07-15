import { useNavigate } from "react-router-dom";
import { PATH_PUBLIC } from "@/routes/paths";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(PATH_PUBLIC.home);
  };

  const handleGoSignIn = () => {
    navigate(PATH_PUBLIC.signIn);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0", color: "#e74c3c" }}>401</h1>
      <h2 style={{ fontSize: "2rem", margin: "10px 0", color: "#2c3e50" }}>
        Unauthorized Access
      </h2>
      <p style={{ fontSize: "1.2rem", color: "#7f8c8d", marginBottom: "30px" }}>
        Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với tài
        khoản có quyền phù hợp.
      </p>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={handleGoSignIn}
          style={{
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#2980b9")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#3498db")
          }
        >
          Đăng Nhập
        </button>

        <button
          onClick={handleGoHome}
          style={{
            padding: "12px 24px",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#7f8c8d")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#95a5a6")
          }
        >
          Về Trang Chủ
        </button>
      </div>

      <div style={{ marginTop: "40px", color: "#bdc3c7" }}>
        <p>Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với quản trị viên.</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
