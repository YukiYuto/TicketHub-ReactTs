import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth.hook";
import AvatarUpload from "@/components/common/AvatarUpload";
import "@styles/customer/CustomerProfile.css";

const CustomerProfilePage = () => {
  const { user, completeCustomerProfile, updateCustomerProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    gender: user?.gender || "",
    birthDate: user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "",
    country: user?.country || "",
    cccd: user?.cccd || "",
  });

  useEffect(() => {
    if (user && !isEditing) {
      setEditedUser({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        gender: user.gender || "",
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "",
        country: user.country || "",
        cccd: user.cccd || "",
      });
    }
  }, [user, isEditing]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      gender: user?.gender || "",
      birthDate: user?.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "",
      country: user?.country || "",
      cccd: user?.cccd || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset về giá trị ban đầu
    setEditedUser({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      gender: user?.gender || "",
      birthDate: user?.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "",
      country: user?.country || "",
      cccd: user?.cccd || "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangeAvatar = async (avatarUrl: string) => {
    try {
      await updateCustomerProfile({ avatarUrl });
      // Optionally show success message
    } catch (error: any) {
      console.error("Failed to update avatar:", error.message);
      // Optionally show error message
    }
  };

  const handleSave = async () => {
    try {
      const profileData = {
        ...editedUser,
        birthDate: editedUser.birthDate
          ? new Date(editedUser.birthDate)
          : new Date(),
      };

      await completeCustomerProfile(profileData);
      setIsEditing(false);
      // Optionally show success message
    } catch (error: any) {
      console.error("Failed to save profile:", error.message);
      // Optionally show error message
    }
  };

  return (
    <div className="customer-profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-title">Customer Profile</h1>
        </div>

        {/* Content */}
        <div className="profile-content">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <AvatarUpload
              currentAvatar={user?.avatarUrl}
              onAvatarChange={handleChangeAvatar}
              size="large"
            />

            {/* Action Buttons */}
            <div className="profile-actions">
              {!isEditing ? (
                <button
                  className="action-btn btn-primary"
                  onClick={handleEditProfile}
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="action-btn btn-primary"
                    onClick={handleSave}
                  >
                    💾 Save
                  </button>
                  <button
                    className="action-btn btn-secondary"
                    onClick={handleCancel}
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="profile-info-section">
            <div className="info-header">
              <h2 className="info-title">📋 Personal Information</h2>
            </div>

            <div className="info-content">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="info-input"
                      value={editedUser.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">{user?.fullName}</div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">Email</span>
                  {isEditing ? (
                    <input
                      type="email"
                      className="info-input"
                      value={editedUser.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">{user?.email}</div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">Phone</span>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="info-input"
                      value={editedUser.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">{user?.phoneNumber}</div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">Address</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="info-input"
                      value={editedUser.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">{user?.address}</div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">Gender</span>
                  {isEditing ? (
                    <select
                      className="info-input"
                      value={editedUser.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="info-value">{user?.gender}</div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">Birth Date</span>
                  {isEditing ? (
                    <input
                      type="date"
                      className="info-input"
                      value={editedUser.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">
                      {user?.birthDate
                        ? new Date(user.birthDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not specified"}
                    </div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">Country</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="info-input"
                      value={editedUser.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">{user?.country}</div>
                  )}
                </div>

                <div className="info-item">
                  <span className="info-label">CCCD/ID</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="info-input"
                      value={editedUser.cccd}
                      onChange={(e) =>
                        handleInputChange("cccd", e.target.value)
                      }
                    />
                  ) : (
                    <div className="info-value">{user?.cccd}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
