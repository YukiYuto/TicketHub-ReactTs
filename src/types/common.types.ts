// Common types used across the application

export interface IResponseDTO<T> {
  result: T;
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

// Có thể thêm các type chung khác ở đây
export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IPaginatedResponse<T> extends IResponseDTO<T[]> {
  meta: IPaginationMeta;
}

export type ApiStatus = "idle" | "loading" | "success" | "error";

export interface ISelectOption {
  value: string | number;
  label: string;
}
