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
  userName: string;
  fullName: string;
  //gender: string;
  birthDate: string;
  email: string;
  country: string;
  phoneNumber: string;
  address: string;
  updateTime: Date;
  //isUploadDegree: boolean;
  //isAccepted: boolean;
  roles: string[];
}

export interface ICompleteCustomerProfile {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  country: string;
  idNumber: string;
}

export type IAuthContextActionTypes =
  | "INITIAL"
  | "SIGNIN"
  | "SIGNINBYGOOGLE"
  | "SIGNOUT"
  | "COMPLETE_PROFILE";

export const IAuthContextActionTypes = {
  INITIAL: "INITIAL" as "INITIAL",
  SIGNIN: "SIGNIN" as "SIGNIN",
  SIGNINBYGOOGLE: "SIGNINBYGOOGLE" as "SIGNINBYGOOGLE",
  SIGNOUT: "SIGNOUT" as "SIGNOUT",
  COMPLETE_PROFILE: "COMPLETE_PROFILE" as "COMPLETE_PROFILE",
};

export interface IAuthContextAction {
  type: IAuthContextActionTypes;
  payload?: IUserInfo;
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
  state: IAuthContextState;

  signInByEmailPassword: (signInField: ISignInDTO) => Promise<void>;
  signInByGoogle: (signInGoogle: ISignInByGoogleDTO) => Promise<void>;
  signOut: () => Promise<void>;
  signUpCustomer: (signUpField: ISignUpCustomerDTO) => Promise<void>;
}

export type IRoles = "MEMBER" | "STAFF" | "ADMIN" | "ORGANIZATION";

export const RolesEnum = {
  MEMBER: "MEMBER" as "MEMBER",
  STAFF: "STAFF" as "STAFF",
  ADMIN: "ADMIN" as "ADMIN",
  ORGANIZATION: "ORGANIZATION" as "ORGANIZATION",
};
