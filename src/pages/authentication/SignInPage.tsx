import "@styles/authentication/SignIn.css";
import { useState } from "react";
import useAuth from "@/hooks/useAuth.hook";
import type { ISignInDTO, ISignInByGoogleDTO } from "@/types/auth.types";
import auth, { googleProvider } from "@firebase-config/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignInPage = () => {
  const { signInByEmailPassword, signInByGoogle } = useAuth();
  const [formData, setFormData] = useState<ISignInDTO>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    try {
      await signInByEmailPassword(formData);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleGoogle = async () => {
  //   //try {
  //   //console.log("Starting Google sign in...");
  //   const result = await signInWithPopup(auth, googleProvider);
  //   //console.log("Google popup result:", result);

  //   if (result.user) {
  //     //console.log("User found:", result.user.email);

  //     // Lấy oauthAccessToken từ credential
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const oauthAccessToken = credential?.accessToken;
  //     //console.log("OAuth Access token:", oauthAccessToken);

  //     if (!oauthAccessToken) {
  //       alert("Không thể lấy OAuth access token từ Google");
  //       return;
  //     }

  //     const signInByGoogleDto: ISignInByGoogleDTO = {
  //       token: oauthAccessToken,
  //     };

  //     //     //console.log("Calling signInByGoogle with data:", signInByGoogleDto);
  //         try {
  //           await signInByGoogle(signInByGoogleDto);
  //     //       //console.log("Google sign in completed successfully");
  //         } catch (backendError: any) {
  //           //console.error("Backend error details:", {
  //             message: backendError.message,
  //             response: backendError.response?.data,
  //             status: backendError.response?.status,
  //             config: backendError.config,
  //           });
  //     //       alert(
  //     //         `Lỗi backend: ${
  //     //           backendError.response?.data?.message ||
  //     //           backendError.message ||
  //     //           "Không thể kết nối đến server"
  //     //         }`
  //     //       );
  //     //     }
  //     //   }
  //     // } catch (error: any) {
  //     //   console.error("Google sign in error details:", {
  //     //     code: error.code,
  //     //     message: error.message,
  //     //     email: error.email,
  //     //     credential: error.credential,
  //     //     customData: error.customData,
  //     //   });

  //     //   //Hiển thị error message thân thiện hơn
  //     //   if (error.code === "auth/popup-closed-by-user") {
  //     //     alert("Đăng nhập bị hủy bởi người dùng");
  //     //   } else if (error.code === "auth/network-request-failed") {
  //     //     alert("Lỗi kết nối mạng. Vui lòng thử lại.");
  //     //   } else if (error.code === "auth/unauthorized-domain") {
  //     //     alert("Domain chưa được ủy quyền. Vui lòng liên hệ admin.");
  //     //   } else {
  //     //     alert(`Lỗi đăng nhập Google: ${error.message}`);
  //   }
  // };

  const handleGoogle = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const oauthAccessToken = credential?.accessToken;

      if (!oauthAccessToken) {
        alert("Không thể lấy OAuth access token từ Google.");
        return;
      }

      const signInByGoogleDto: ISignInByGoogleDTO = {
        token: oauthAccessToken,
      };

      await signInByGoogle(signInByGoogleDto);
    } catch (error: any) {
      console.error("Google sign-in error:", error);

      switch (error.code) {
        case "auth/popup-closed-by-user":
          alert("Đăng nhập bị hủy bởi người dùng.");
          break;
        case "auth/network-request-failed":
          alert("Lỗi kết nối mạng. Vui lòng thử lại.");
          break;
        case "auth/unauthorized-domain":
          alert("Domain chưa được ủy quyền. Vui lòng liên hệ admin.");
          break;
        default:
          alert(`Lỗi đăng nhập Google: ${error.message}`);
          break;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        <div className="mx-auto px-6 sm:px-0 max-w-sm">
          <button
            onClick={handleGoogle}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
            <div></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
