export interface ISignInDTO {
  email: string;
  password: string;
}

export interface ISignInByGoogleDTO {
  token: string;
}

interface IBaseAuthResponseDto<T> {
  result: T;
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

interface ISignInResult {
  accessToken: string;
  refreshToken: string;
}

interface ISignInByGoogleResult extends ISignInResult {
  isProfileComplete: boolean;
}

export type ISignInResponseDTO = IBaseAuthResponseDto<ISignInResult>;
export type ISignInByGoogleResponseDto =
  IBaseAuthResponseDto<ISignInByGoogleResult>;

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
  dateOfBirth: string;
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

export interface IResponseDTO<T> {
  result: T;
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

export interface ISignUpResponseDTO {
  result: string;
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

export interface IJwtTokenDTO {
  result: {
    accessToken: string;
    refreshToken: string;
  };
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

export interface IUserInfo {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
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
  | "SIGNINBYGOOGLE"
  | "SIGNOUT"
  | "COMPLETE_PROFILE"
  | "SET_LOADING";

export const IAuthContextActionTypes = {
  INITIAL: "INITIAL" as "INITIAL",
  SIGNIN: "SIGNIN" as "SIGNIN",
  SIGNINBYGOOGLE: "SIGNINBYGOOGLE" as "SIGNINBYGOOGLE",
  SIGNOUT: "SIGNOUT" as "SIGNOUT",
  COMPLETE_PROFILE: "COMPLETE_PROFILE" as "COMPLETE_PROFILE",
  SET_LOADING: "SET_LOADING" as "SET_LOADING",
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
  verifyEmail: (verifyEmail: IVerifyEmailDTO) => Promise<void>;
  completeCustomerProfile: (
    profile: ICompleteCustomerProfile
  ) => Promise<boolean>;
  // updateCustomerProfile: (profile: IUpdateCustomerProfileDTO) => Promise<void>;
}

export type IRoles = "MEMBER" | "STAFF" | "ADMIN" | "ORGANIZATION";

export const RolesEnum = {
  MEMBER: "MEMBER" as "MEMBER",
  STAFF: "STAFF" as "STAFF",
  ADMIN: "ADMIN" as "ADMIN",
  ORGANIZATION: "ORGANIZATION" as "ORGANIZATION",
};
