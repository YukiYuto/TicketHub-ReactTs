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
  IResponseDTO,
  IUserInfo,
  ISignInDTO,
  ISignInResponseDTO,
  ISignInByGoogleDTO,
  ISignInByGoogleResponseDto,
  ISignUpCustomerDTO,
  IVerifyEmailDTO,
  ISignUpResponseDTO,
  ICompleteCustomerProfile,
} from "@/types/auth.types";
import { IAuthContextActionTypes, RolesEnum } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";
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
import {
  PATH_ADMIN,
  PATH_ORGANIZATION,
  PATH_PUBLIC,
  PATH_USER,
} from "@routes/paths";
import toast from "@/utils/toast";

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
    case IAuthContextActionTypes.SIGNIN:
    case IAuthContextActionTypes.SIGNINBYGOOGLE:
      return {
        ...state, //3 chấm là sao chép tất cả các thuộc tính của state
        isAuthenticated: true,
        isFullInfo: true,
        isAuthLoading: false,
        user: action.payload,
      };
    // Handle the SIGNOUT action
    case IAuthContextActionTypes.SIGNOUT:
      return {
        ...initialAuthState, // Reset to initial state
      };
    // Handle the COMPLETE_PROFILE action
    case IAuthContextActionTypes.COMPLETE_PROFILE:
      return {
        ...state,
        isFullInfo: true,
        user: action.payload,
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
    const currentTime = Date.now() / 1000; // current time in seconds

    if (decodedToken.exp == null) {
      return false;
    }

    return decodedToken.exp > currentTime;
  };
  // Initialize method callback
  const initializeAuthContext = useCallback(async () => {
    try {
      const { accessToken, refreshToken } = getJwtTokenSession();

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

        const newAccessToken = jwtToken.result.accessToken;
        const newRefreshToken = jwtToken.result.refreshToken;

        setJwtTokenSession(newAccessToken, newRefreshToken);
      }

      const { accessToken: validToken } = getJwtTokenSession();
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${validToken}`;
      const userInfoResponse = await axiosInstance.get<IResponseDTO<IUserInfo>>(
        GET_USER_INFO_URL
      );
      const userInfo: IUserInfo = userInfoResponse.data.result;

      dispatch({
        type: IAuthContextActionTypes.SIGNIN,
        payload: userInfo,
      });
    } catch (error) {
      setJwtTokenSession(null, null);
      dispatch({ type: IAuthContextActionTypes.SIGNOUT });
    }
  }, []);

  //useEffect
  useEffect(() => {
    console.log("AuthContext Initialization start");
    initializeAuthContext()
      .then(() => console.log("AuthContext Initialization was successfully"))
      .catch((error: Error) => console.log(error));
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
                //toast.success("Resend email successfully!");
                toast.success(resendEmail.data.message);
              } else {
                toast.error(resendEmail.data.message || "Resend email failed!");
              }
            } catch (error) {
              toast.error("An error occurred while resending email!");
            }
          }
          return;
        }

        const { accessToken, refreshToken } = signInResponse.result;
        setJwtTokenSession(accessToken, refreshToken);

        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        dispatch({
          type: IAuthContextActionTypes.SIGNIN,
          payload: userInfo,
        });
        toast.success("Sign In Successful");
        //kiểm tra xem user có role gì và chuyển hướng đến trang tương ứng
        const userRole = userInfo.roles[0];
        if (userRole === RolesEnum.MEMBER) {
          navigate(PATH_PUBLIC.home);
        } else if (userRole === RolesEnum.ORGANIZATION) {
          navigate(PATH_ORGANIZATION.home);
        } else {
          navigate(PATH_ADMIN.dashboard);
        }
      } catch (error) {
        console.error("Sign In Error:", error);
        toast.error("An error occurred during sign in!");
      }
    },
    [navigate]
  );
  //SignInByGoogle
  const signInByGoogle = useCallback(
    async (signInGoogle: ISignInByGoogleDTO) => {
      try {
        const response = await axiosInstance.post<ISignInByGoogleResponseDto>(
          SIGNIN_BY_GOOGLE_URL,
          signInGoogle
        );

        const signInResponse: ISignInByGoogleResponseDto = response.data;
        if (!signInResponse.isSuccess) {
          toast.error(signInResponse.message || "Sign in by Google failed!");
          return;
        }

        const { accessToken, refreshToken, isProfileComplete } =
          signInResponse.result;
        setJwtTokenSession(accessToken, refreshToken);

        toast.success("Sign In by Google Successful");

        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        if (userInfo.roles.includes(RolesEnum.MEMBER) && !isProfileComplete) {
          dispatch({
            type: IAuthContextActionTypes.SIGNINBYGOOGLE,
            payload: userInfo,
          });
          navigate(PATH_USER.completeProfile);
        } else {
          dispatch({
            type: IAuthContextActionTypes.SIGNINBYGOOGLE,
            payload: userInfo,
          });
          navigate(PATH_PUBLIC.home);
        }
      } catch (error) {
        console.error("Sign In by Google Error:", error);
        toast.error("An error occurred during sign in by Google!");
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
              resendEmail.message || "Resend email verification failed!"
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
        console.error("Verify Email Error:", error);
        toast.error("An error occurred during email verification!");
      }
    },
    [navigate]
  );

  //Complete Profile
  const completeProfile = useCallback(
    async (completeProfileData: ICompleteCustomerProfile) => {
      try {
        console.log("Sending complete profile request:", {
          url: COMPLETE_PROFILE_URL,
          data: completeProfileData,
          method: "PUT",
        });

        const response = await axiosInstance.post<ISignInByGoogleResponseDto>(
          COMPLETE_PROFILE_URL,
          completeProfileData
        );

        console.log("Complete profile response:", response.data);

        const completeUserDto = response.data;
        if (!completeUserDto.isSuccess) {
          toast.error("Profile completed failed!");
          return;
        }

        const { accessToken, refreshToken } = completeUserDto.result;
        setJwtTokenSession(accessToken, refreshToken);
        const userInfoResponse = await axiosInstance.get<
          IResponseDTO<IUserInfo>
        >(GET_USER_INFO_URL);
        const userInfo = userInfoResponse.data.result;

        dispatch({
          type: IAuthContextActionTypes.COMPLETE_PROFILE,
          payload: userInfo,
        });
        toast.success("Profile completed successfully!");
        navigate(PATH_PUBLIC.home);
      } catch (error) {
        console.error("Complete Profile Error:", error);
        toast.error("An error occurred while completing the profile!");
      }
    },
    [navigate]
  );

  //signOut
  const signOut = useCallback(async () => {
    setJwtTokenSession(null, null);
    dispatch({
      type: IAuthContextActionTypes.SIGNOUT,
    });
    toast.success("Sign Out Successful");
    navigate(PATH_PUBLIC.signIn);
  }, [navigate]);

  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    isFullInfo: state.isFullInfo,
    user: state.user,
    state: state,

    signInByEmailPassword: signInByEmailPassword,
    signInByGoogle: signInByGoogle,
    signUpCustomer: signUpCustomer,
    verifyEmail: verifyEmail,
    signOut: signOut,
    completeCustomerProfile: completeProfile,
  };

  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
