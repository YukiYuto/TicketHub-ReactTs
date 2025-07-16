import React, { useState, useRef } from "react";
import { uploadFile } from "@/utils/upload/uploadService";
import type { FileType } from "@/utils/upload/uploadService";
import {
  validateImage,
  createPreviewUrl,
  revokePreviewUrl,
} from "@/utils/upload/imageUtils";

interface ImageUploadProps {
  fileType: FileType;
  onImageChange: (imageUrl: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  onError?: (error: string) => void;
  onWarning?: (warning: string) => void;
  currentImage?: string;
  placeholder?: string;
  className?: string;
  buttonText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  fileType,
  onImageChange,
  onUploadStart,
  onUploadEnd,
  onError,
  onWarning,
  currentImage,
  placeholder = "🖼️",
  className = "",
  buttonText = "Upload Image",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImage(file);

    // Show warning for large files but still allow upload
    if (validation.error && validation.isValid) {
      onWarning?.(validation.error);
    }

    if (!validation.isValid) {
      onError?.(validation.error || "Invalid image file");
      return;
    }

    try {
      setIsUploading(true);
      onUploadStart?.();

      // Create preview
      const preview = createPreviewUrl(file);
      setPreviewUrl(preview);

      // Upload to server với specified FileType
      const response = await uploadFile(file, fileType);

      // Update image
      onImageChange(response.result);

      // Cleanup
      revokePreviewUrl(preview);
      setPreviewUrl(null);
    } catch (error) {
      onError?.("Failed to upload image. Please try again.");

      // Cleanup preview on error
      if (previewUrl) {
        revokePreviewUrl(previewUrl);
        setPreviewUrl(null);
      }
    } finally {
      setIsUploading(false);
      onUploadEnd?.();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const imageSrc = previewUrl || currentImage;

  return (
    <div className={`image-upload ${className}`}>
      <div className="image-container">
        {imageSrc ? (
          <img src={imageSrc} alt="Upload preview" className="upload-image" />
        ) : (
          <div className="image-placeholder">
            <span className="placeholder-icon">{placeholder}</span>
          </div>
        )}

        {isUploading && (
          <div className="upload-overlay">
            <div className="upload-spinner"></div>
            <span>Uploading...</span>
          </div>
        )}
      </div>

      <button
        className="upload-btn"
        onClick={handleUploadClick}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : buttonText}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
