import { PATH_PUBLIC } from "@/routes/paths";
import useAuth from "@hooks/useAuth.hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ICompleteCustomerProfile } from "@/types/auth.types";
import InputField from "../../components/general/InputField";
import Button from "@/components/general/Button";
import toast from "react-hot-toast";
import "@styles/authentication/SignUpCustomer.css";

const CustomerCompleteProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { completeCustomerProfile, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_PUBLIC.signIn);
    }
  }, [isAuthenticated, navigate, user]);

  const completeProfileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{9,11}$/, "Phone Number is not valid"),
    birthDate: Yup.date().required("Date of Birth is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    cccd: Yup.string()
      .required("CCCD is required")
      .matches(/^\d{12}$/, "CCCD must be 12 digits"),
    gender: Yup.string().required("Gender is required"),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(completeProfileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      birthDate: undefined,
      address: "",
      country: "",
      cccd: "",
      gender: "",
    },
  });

  const onSubmit = async (data: ICompleteCustomerProfile) => {
    try {
      setLoading(true);
      await completeCustomerProfile(data);
      reset();
      navigate(PATH_PUBLIC.home);
    } catch (error) {
      toast.error("Failed to complete profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Complete Your Profile</h1>
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-section">
          <p>Upload Avatar (Coming Soon)</p>
        </div>
        <InputField
          control={control}
          inputName="fullName"
          label="Full Name"
          inputType="text"
          placeholder="Enter your full name"
          error={errors.fullName?.message}
        />

        <InputField
          control={control}
          inputName="phoneNumber"
          label="Phone Number"
          inputType="text"
          placeholder="Enter your phone number"
          error={errors.phoneNumber?.message}
        />

        <InputField
          control={control}
          inputName="birthDate"
          label="Date of Birth"
          inputType="date"
          error={errors.birthDate?.message}
        />

        <InputField
          control={control}
          inputName="address"
          label="Address"
          inputType="text"
          placeholder="Enter your address"
          error={errors.address?.message}
        />

        <InputField
          control={control}
          inputName="country"
          label="Country"
          inputType="text"
          placeholder="Enter your country"
          error={errors.country?.message}
        />

        <InputField
          control={control}
          inputName="cccd"
          label="CCCD"
          inputType="text"
          placeholder="Enter your CCCD"
          error={errors.cccd?.message}
        />

        <InputField
          control={control}
          inputName="gender"
          label="Gender"
          inputType="select"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          error={errors.gender?.message}
        />

        <div className="signup-btn">
          <Button
            variant="primary"
            type="submit"
            label="Complete Profile"
            loading={loading}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerCompleteProfile;
