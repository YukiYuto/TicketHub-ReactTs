import type { IResponseDTO } from "./common.types";

export interface ISignInDTO {
  email: string;
  password: string;
}

export interface ISignInByGoogleDTO {
  token: string;
}

interface ISignInResult {
  accessToken: string;
  refreshToken: string;
}

interface ISignInByGoogleResult extends ISignInResult {
  isProfileComplete: boolean;
}

export type ISignInResponseDTO = IResponseDTO<ISignInResult>;
export type ISignInByGoogleResponseDTO = IResponseDTO<ISignInByGoogleResult>;

export interface ISignUpCustomerDTO {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  birthDate: Date;
  address: string;
  country: string;
  gender: string;
  cccd: string;
}

export interface ISignUpOrganizerDTO {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  birthDate: Date;
  address: string;
  country: string;
  idNumber: string;
  organizationName: string;
  organizationType: string;
}

export interface IUpdateCustomerProfileDTO {
  fullName?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  country?: string;
  cccd?: string;
  gender?: string;
  avatarUrl?: string;
}

export interface ICompleteCustomerProfile {
  birthDate: Date;
  avatarUrl?: string;
  country: string;
  address: string;
  phoneNumber: string;
  fullName: string;
  cccd: string;
  gender: string;
}

export interface IVerifyEmailDTO {
  userId: string;
  token: string;
}

export interface ISignUpResponseDTO extends IResponseDTO<string> {}

export interface IJwtTokenDTO
  extends IResponseDTO<{
    accessToken: string;
    refreshToken: string;
  }> {}

export interface IUserInfo {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date; // Sửa từ string sang Date để nhất quán
  address: string;
  avatarUrl?: string;
  userName: string;
  cccd?: string;
  organizationName?: string;
  taxId?: string;
  gender?: string;
  country: string;
  updateTime: Date;
  roles: string[];
}

export type IAuthContextActionTypes =
  | "INITIAL"
  | "SIGNIN"
  | "SIGNIN_BY_GOOGLE"
  | "SIGNOUT"
  | "COMPLETE_PROFILE"
  | "SET_LOADING";

export const AuthContextActionTypes = {
  INITIAL: "INITIAL" as const,
  SIGNIN: "SIGNIN" as const,
  SIGNIN_BY_GOOGLE: "SIGNIN_BY_GOOGLE" as const,
  SIGNOUT: "SIGNOUT" as const,
  COMPLETE_PROFILE: "COMPLETE_PROFILE" as const,
  SET_LOADING: "SET_LOADING" as const,
};

export interface IAuthContextAction {
  type: IAuthContextActionTypes;
  payload?: IUserInfo | boolean;
  isFullInfo?: boolean;
}

export interface IAuthContextState {
  isAuthenticated: boolean;
  isFullInfo: boolean;
  isAuthLoading: boolean;
  user?: IUserInfo;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isFullInfo: boolean;
  user?: IUserInfo;

  signInByEmailPassword: (signInField: ISignInDTO) => Promise<boolean>;
  signInByGoogle: (signInGoogle: ISignInByGoogleDTO) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  signUpCustomer: (signUpField: ISignUpCustomerDTO) => Promise<void>;
  signUpOrganizer: (signUpField: ISignUpOrganizerDTO) => Promise<void>; // Thêm method bị thiếu
  verifyEmail: (verifyEmail: IVerifyEmailDTO) => Promise<void>;
  completeCustomerProfile: (
    profile: ICompleteCustomerProfile
  ) => Promise<boolean>;
  updateCustomerProfile: (
    profile: IUpdateCustomerProfileDTO
  ) => Promise<boolean>;
}

export type IRoles = "MEMBER" | "STAFF" | "ADMIN" | "ORGANIZATION";

export const RolesEnum = {
  MEMBER: "MEMBER" as const,
  STAFF: "STAFF" as const,
  ADMIN: "ADMIN" as const,
  ORGANIZATION: "ORGANIZATION" as const,
} as const;
