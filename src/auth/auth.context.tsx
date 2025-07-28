import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type {
  IAuthContext,
  IAuthContextState,
  IAuthContextAction,
  IJwtTokenDTO,
  IUserInfo,
  ISignInDTO,
  ISignInResponseDTO,
  ISignInByGoogleDTO,
  ISignInByGoogleResponseDTO,
  ISignUpCustomerDTO,
  IVerifyEmailDTO,
  ISignUpResponseDTO,
  ICompleteCustomerProfile,
  IUpdateCustomerProfileDTO,
} from "@/types/auth.types";
import { AuthContextActionTypes } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";
import type { IResponseDTO } from "@/types/common.types";
import { jwtDecode } from "jwt-decode";
import { getJwtTokenSession, setJwtTokenSession } from "@/auth/auth.utilities";
import axiosInstance from "@utils/axios/axiosInstance";
import {
  REFRESH_URL,
  GET_USER_INFO_URL,
  SIGNIN_URL,
  SIGNIN_BY_GOOGLE_URL,
  SIGNUP_URL,
  SEND_EMAIL_VERIFICATION_URL,
  VERIFY_EMAIL_URL,
  COMPLETE_PROFILE_URL,
} from "@utils/apiUrl/authApiUrl";
import { PATH_PUBLIC } from "@routes/paths";
import toast from "@/utils/toast/toast";

// Initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isFullInfo: false,
  isAuthLoading: true,
  user: undefined,
};

const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  switch (action.type) {
    // Handle the SIGNIN action
    case AuthContextActionTypes.SIGNIN:
    case AuthContextActionTypes.SIGNIN_BY_GOOGLE:
      return {
        ...state, //3 chấm là sao chép tất cả các thuộc tính của state
        isAuthenticated: true,
        isFullInfo: action.isFullInfo ?? true, // Use from action or default to true
        isAuthLoading: false,
        user: action.payload as IUserInfo,
      };
    // Handle the SIGNOUT action
    case AuthContextActionTypes.SIGNOUT:
      return {
        ...initialAuthState, // Reset to initial state
        isAuthLoading: false, // Set loading to false after signout
      };
    // Handle the COMPLETE_PROFILE action
    case AuthContextActionTypes.COMPLETE_PROFILE:
      return {
        ...state,
        isFullInfo: true,
        user: action.payload as IUserInfo,
      };
    // Handle the SET_LOADING action
    case AuthContextActionTypes.SET_LOADING:
      return {
        ...state,
        isAuthLoading:
          typeof action.payload === "boolean" ? action.payload : false,
      };
    // default
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext<IAuthContext | null>(null);

// Interface for context props
interface IProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  const isTokenValid = (token: string | null) => {
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp == null) {
      return false;
    }

    return decodedToken.exp > currentTime;
  };
  // Initialize method callback
  const initializeAuthContext = useCallback(async () => {
    try {
      const { accessToken, refreshToken } = getJwtTokenSession();

      let validToken = accessToken;

      if (isTokenValid(accessToken) && isTokenValid(refreshToken)) {
        const token = {
          accessToken,
          refreshToken,
        };
        const response = await axiosInstance.post<IJwtTokenDTO>(
          REFRESH_URL,
          token
        );
        const jwtToken: IJwtTokenDTO = response.data;

        if (!jwtToken.isSuccess) {
          throw new Error(jwtToken.message);
        }

        // Check if result is a string token or an object with accessToken/refreshToken
        let newAccessToken: string;
        let newRefreshToken: string;

        if (typeof jwtToken.result === "string") {
          // If result is a string, it's the new access token
          // Keep the existing refresh token since it's still valid
          newAccessToken = jwtToken.result;
          newRefreshToken = refreshToken || "";
        } else if (jwtToken.result && typeof jwtToken.result === "object") {
          // If result is an object, both tokens are being refreshed
          newAccessToken = (jwtToken.result as any).accessToken;
          newRefreshToken = (jwtToken.result as any).refreshToken;
        } else {
          throw new Error("Unexpected refresh response format");
        }

        setJwtTokenSession(newAccessToken, newRefreshToken);
        validToken = newAccessToken;
      }

      if (!validToken) {
        throw new Error("No valid token found");
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${validToken}`;

      const userInfoResponse = await axiosInstance.get<IResponseDTO<IUserInfo>>(
        GET_USER_INFO_URL
      );
      const userInfo: IUserInfo = userInfoResponse.data.result;

      dispatch({
        type: AuthContextActionTypes.SIGNIN,
        payload: userInfo,
        isFullInfo: true,
      });
    } catch (error) {
      setJwtTokenSession(null, null);
      dispatch({ type: AuthContextActionTypes.SIGNOUT });
    } finally {
      // Always set loading to false when initialization is complete
      dispatch({ type: AuthContextActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  //useEffect
  useEffect(() => {
    initializeAuthContext();
  }, []);

  //signInByEmailPassword
  const signInByEmailPassword = useCallback(
    async (signInDTO: ISignInDTO) => {
      try {
        const response = await axiosInstance.post<ISignInResponseDTO>(
          SIGNIN_URL,
          signInDTO
        );
        const signInResponse: ISignInResponseDTO = response.data;
        //kiểm tra xem tài khoản đã confirm email hay chưa
        if (!signInResponse.isSuccess) {
          toast.error(signInResponse.message || "Sign in failed!");
          if (signInResponse.statusCode === 401) {
            try {
              const resendEmail = await axiosInstance.post<
                IResponseDTO<string>
              >(SEND_EMAIL_VERIFICATION_URL, { email: signInDTO.email });
              if (resendEmail.data.isSuccess) {
                toast.success(resendEmail.data.message);
              } else {
                toast.error(resendEmail.data.message || "Resend email failed!");
              }
            } catch (error) {
              toast.error("An error occurred while resending email!");
            }
          }
          return false;
        }

        const { accessToken, refreshToken } = signInResponse.result;
        setJwtTokenSession(accessToken, refreshToken);

        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        dispatch({
          type: AuthContextActionTypes.SIGNIN,
          payload: userInfo,
        });
        toast.success("Sign In Successful");
        return true;
      } catch (error) {
        toast.error("An error occurred during sign in!");
        return false;
      }
    },
    [navigate]
  );
  //SignInByGoogle
  const signInByGoogle = useCallback(
    async (signInGoogle: ISignInByGoogleDTO) => {
      try {
        const response = await axiosInstance.post<ISignInByGoogleResponseDTO>(
          SIGNIN_BY_GOOGLE_URL,
          signInGoogle
        );

        const signInResponse: ISignInByGoogleResponseDTO = response.data;
        if (!signInResponse.isSuccess) {
          toast.error(signInResponse.message || "Sign in by Google failed!");
          return false;
        }

        const { accessToken, refreshToken, isProfileComplete } =
          signInResponse.result;
        setJwtTokenSession(accessToken, refreshToken);

        toast.success("Sign In by Google Successful");

        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        dispatch({
          type: AuthContextActionTypes.SIGNIN_BY_GOOGLE,
          payload: userInfo,
          isFullInfo: isProfileComplete,
        });
        return true;
      } catch (error) {
        console.error("Sign In by Google Error:", error);
        toast.error("An error occurred during sign in by Google!");
        return false;
      }
    },
    [navigate]
  );

  //SignUpCustomer
  const signUpCustomer = useCallback(
    async (signUpCustomerDTO: ISignUpCustomerDTO) => {
      try {
        const response = await axiosInstance.post<ISignUpResponseDTO>(
          SIGNUP_URL,
          signUpCustomerDTO
        );
        const signUpResponse: ISignUpResponseDTO = response.data;

        if (signUpResponse.isSuccess) {
          toast.success(signUpResponse.message || "Sign Up Successful!");
          const emailToSend = {
            email: signUpCustomerDTO.email,
          };
          const resendEmailResponse = await axiosInstance.post<
            IResponseDTO<string>
          >(SEND_EMAIL_VERIFICATION_URL, emailToSend);

          const resendEmail = resendEmailResponse.data;
          if (resendEmail.isSuccess) {
            toast.success(
              "Sign up successful! Please check your email to verify your account."
            );
            navigate(PATH_PUBLIC.signIn);
          } else {
            toast.error(
              resendEmail.message || "Send email verification failed!"
            );
          }
        }
      } catch (error) {
        console.error("Sign Up Error:", error);
        toast.error("An error occurred during sign up!");
      }
    },
    [navigate]
  );

  //verifyEmail
  const verifyEmail = useCallback(
    async (verifyEmailDTO: IVerifyEmailDTO) => {
      try {
        const response = await axiosInstance.post<IResponseDTO<string>>(
          VERIFY_EMAIL_URL,
          verifyEmailDTO
        );
        const verifyResponse: IResponseDTO<string> = response.data;

        if (verifyResponse.isSuccess) {
          toast.success("Email verified successfully! You can now sign in.");
          navigate(PATH_PUBLIC.signIn);
        } else {
          toast.error(verifyResponse.message || "Email verification failed!");
        }
      } catch (error) {
        toast.error("An error occurred during email verification!");
      }
    },
    [navigate]
  );

  //Complete Profile
  const completeProfile = useCallback(
    async (completeProfileData: ICompleteCustomerProfile) => {
      try {
        const response = await axiosInstance.post<ISignInByGoogleResponseDTO>(
          COMPLETE_PROFILE_URL,
          completeProfileData
        );

        const completeUserDto: ISignInByGoogleResponseDTO = response.data;
        if (!completeUserDto.isSuccess) {
          toast.error("Profile completed failed!");
          return false;
        }

        const { accessToken, refreshToken } = completeUserDto.result;
        setJwtTokenSession(accessToken, refreshToken);
        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        dispatch({
          type: AuthContextActionTypes.COMPLETE_PROFILE,
          payload: userInfo,
          isFullInfo: true,
        });

        toast.success("Profile completed successfully!");
        return true;
      } catch (error) {
        toast.error("An error occurred while completing the profile!");
        return false;
      }
    },
    [navigate]
  );

  // Update Customer Profile
  const updateCustomerProfile = useCallback(
    async (updateData: IUpdateCustomerProfileDTO) => {
      try {
        const response = await axiosInstance.post<ISignInByGoogleResponseDTO>(
          COMPLETE_PROFILE_URL,
          updateData
        );

        const updateResult: ISignInByGoogleResponseDTO = response.data;
        if (!updateResult.isSuccess) {
          toast.error("Failed to update profile!");
          return false;
        }

        // Lưu token mới từ response (giống như completeProfile)
        const { accessToken, refreshToken } = updateResult.result;
        setJwtTokenSession(accessToken, refreshToken);

        // Load user info với token mới
        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        dispatch({
          type: AuthContextActionTypes.COMPLETE_PROFILE,
          payload: userInfo,
          isFullInfo: true,
        });

        toast.success("Profile updated successfully!");
        return true;
      } catch (error) {
        toast.error("An error occurred while updating profile!");
        return false;
      }
    },
    []
  );

  //signOut
  const signOut = useCallback(async () => {
    try {
      setJwtTokenSession(null, null);
      dispatch({
        type: AuthContextActionTypes.SIGNOUT,
      });
      toast.success("Sign Out Successful");
      return true;
    } catch (error) {
      toast.error("An error occurred during sign out!");
      return false;
    }
  }, []);

  // TODO: Cần implement signUpOrganizer đúng logic
  const signUpOrganizer = async () => {
    throw new Error("signUpOrganizer not implemented");
  };

  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    isFullInfo: state.isFullInfo,
    user: state.user,

    signInByEmailPassword: signInByEmailPassword,
    signInByGoogle: signInByGoogle,
    signUpCustomer: signUpCustomer,
    signUpOrganizer: signUpOrganizer,
    verifyEmail: verifyEmail,
    signOut: signOut,
    completeCustomerProfile: completeProfile,
    updateCustomerProfile: updateCustomerProfile,
  };

  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
