import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_PUBLIC } from "@/routes/paths";
import useAuth from "@/hooks/useAuth.hook";
import toast from "@/utils/toast/toast";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const userId = query.get("userId");
    const token = query.get("token");

    if (!userId || !token) {
      toast.error("Invalid verification link.");
      return;
    }

    // Call verifyEmail function from auth context
    const handleVerification = async () => {
      try {
        await verifyEmail({ userId, token });
      } catch (error) {
        toast.error("Email verification failed. Please try again.");
      } finally {
        navigate(PATH_PUBLIC.signIn);
      }
    };

    handleVerification();
  }, [verifyEmail, navigate]);

  return null;
};

export default VerifyEmailPage;
