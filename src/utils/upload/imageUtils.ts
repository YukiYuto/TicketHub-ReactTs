// Simple image validation utilities

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  fileSize?: string;
  fileSizeBytes?: number;
}

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateImage = (file: File): ImageValidationResult => {
  const fileSizeFormatted = formatFileSize(file.size);
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only JPEG, PNG, and WebP images are allowed',
      fileSize: fileSizeFormatted,
      fileSizeBytes: file.size
    };
  }

  // Check file size (max 10MB - có thể adjust)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Image size (${fileSizeFormatted}) is too large. Maximum allowed size is 10MB`,
      fileSize: fileSizeFormatted,
      fileSizeBytes: file.size
    };
  }

  // Warning for large files (>5MB)
  const warningSize = 5 * 1024 * 1024; // 5MB
  if (file.size > warningSize) {
    return {
      isValid: true,
      error: `Large file detected (${fileSizeFormatted}). Upload may take longer.`,
      fileSize: fileSizeFormatted,
      fileSizeBytes: file.size
    };
  }

  return { 
    isValid: true,
    fileSize: fileSizeFormatted,
    fileSizeBytes: file.size
  };
};

// Create image preview URL
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

// Cleanup preview URL
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
