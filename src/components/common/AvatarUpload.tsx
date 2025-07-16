import React, { useState, useRef } from "react";
import { uploadAvatar } from "@/utils/upload/uploadService";
import {
  validateImage,
  createPreviewUrl,
  revokePreviewUrl,
} from "@/utils/upload/imageUtils";
import "@styles/components/AvatarUpload.css";

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatarUrl: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  onError?: (error: string) => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange,
  onUploadStart,
  onUploadEnd,
  onError,
  size = "medium",
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate image
    const validation = validateImage(file);

    if (validation.error && validation.isValid) {
      console.warn(`File size warning: ${validation.error}`);
      onError?.(validation.error);
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

      // Upload to server với FileType = 'avatar'
      const response = await uploadAvatar(file);

      // Check if upload was successful
      if (!response.isSuccess) {
        throw new Error(response.message || "Upload failed");
      }

      // Update avatar with URL from result
      onAvatarChange(response.result);

      // Cleanup
      revokePreviewUrl(preview);
      setPreviewUrl(null);
    } catch (error) {
      onError?.("Failed to upload avatar. Please try again.");

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

  const avatarSrc = previewUrl || currentAvatar;

  return (
    <div className={`avatar-upload ${size} ${className}`}>
      <div className="avatar-container">
        <div className="avatar-display">
          {avatarSrc ? (
            <img src={avatarSrc} alt="Avatar" className="avatar-image" />
          ) : (
            <span className="avatar-placeholder">👤</span>
          )}

          {isUploading && (
            <div className="upload-overlay">
              <div className="upload-spinner"></div>
            </div>
          )}
        </div>

        {/* <button
          className="upload-button"
          onClick={handleUploadClick}
          disabled={isUploading}
          title={isUploading ? "Uploading..." : "Change Avatar"}
        >
          {isUploading ? "⏳" : "📷"}
        </button> */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="file-input"
        />
      </div>

      <div className="upload-text" onClick={handleUploadClick}>
        {isUploading ? "Uploading..." : "Change Picture"}
      </div>
    </div>
  );
};

export default AvatarUpload;
