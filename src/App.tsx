import "./App.css";
import { Toaster } from "react-hot-toast";
import GlobalRouter from "./routes";

function App() {
  return (
    <div>
      <GlobalRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            padding: "15px 18px",
            fontSize: "1rem",
            borderRadius: "8px",
            position: "relative",
          },
          success: {
            style: {
              background: "#ecfdf5",
              border: "1px solid #34d399",
              color: "#075f80",
            },
            iconTheme: {
              primary: "#34d399",
              secondary: "#d1fae5",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              border: "1px solid #f87171",
              color: "#7f1d1d",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fecaca",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
