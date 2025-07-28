import axiosInstance from "@utils/axios/axiosInstance";
import { UPLOAD_FILE_URL } from "@utils/apiUrl/imgApiUrl";

export interface UploadResponse {
  result: string;
  isSuccess: boolean;
  statusCode: number;
  message?: string;
}

export type FileType = "avatar" | "event" | "ticket";

// Upload file với FileType
export const uploadFile = async (
  file: File,
  fileType: FileType
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("FileType", fileType);

    const response = await axiosInstance.post(UPLOAD_FILE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload file");
  }
};

// Upload avatar (wrapper)
export const uploadAvatar = async (file: File): Promise<UploadResponse> => {
  return uploadFile(file, "avatar");
};

// Upload service image (wrapper)
export const uploadServiceImage = async (
  file: File
): Promise<UploadResponse> => {
  return uploadFile(file, "event");
};

// Upload service combo image (wrapper)
export const uploadServiceComboImage = async (
  file: File
): Promise<UploadResponse> => {
  return uploadFile(file, "ticket");
};
