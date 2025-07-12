import "@styles/authentication/SignUpCustomer.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/general/InputField";
import type { ISignUpCustomerDTO } from "@/types/auth.types";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth.hook";
import toast from "react-hot-toast";
import { PATH_PUBLIC } from "@/routes/paths";
import { useNavigate } from "react-router-dom";
import Button from "@/components/general/Button";

const SignUpCustomer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signUpCustomer, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_PUBLIC.signUpCustomer);
    }
  }, [isAuthenticated, navigate]);

  const signUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    cccd: Yup.string()
      .required("CCCD is required")
      .matches(/^\d{12}$/, "CCCD must be 12 digits"),
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    birthDate: Yup.date().required("Date of Birth is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      birthDate: new Date(),
      address: "",
      country: "",
      gender: "",
      cccd: "",
    },
  });

  const onSubmit = async (data: ISignUpCustomerDTO) => {
    console.log("Form submitted with data:", data);
    try {
      setLoading(true);
      await signUpCustomer(data);
      toast.success("Sign up successful!");
      reset();
      navigate(PATH_PUBLIC.home);
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Sign up failed!");
      setLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    toast.error("Please fix the form errors before submitting!");
  };
  return (
    <div className="signup-container">
      <h1>Sign Up Customer</h1>
      <form className="signup-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <InputField
          control={control}
          inputName="email"
          label="Email"
          inputType="email"
          placeholder="Enter your email"
        />

        <InputField
          control={control}
          inputName="password"
          label="Password"
          inputType="password"
          placeholder="Enter your password"
        />

        <InputField
          control={control}
          inputName="confirmPassword"
          label="Confirm Password"
          inputType="password"
          placeholder="Confirm your password"
        />

        <InputField
          control={control}
          inputName="fullName"
          label="Full Name"
          inputType="text"
          placeholder="Enter your full name"
        />

        <InputField
          control={control}
          inputName="phoneNumber"
          label="Phone Number"
          inputType="tel"
          placeholder="Enter your phone number"
        />

        <InputField
          control={control}
          inputName="address"
          label="Address"
          inputType="text"
          placeholder="Enter your address"
        />

        <InputField
          control={control}
          inputName="country"
          label="Country"
          inputType="text"
          placeholder="Enter your country"
        />

        <InputField
          control={control}
          inputName="cccd"
          label="CCCD"
          inputType="text"
          placeholder="Enter your CCCD (12 digits)"
        />

        <InputField
          control={control}
          inputName="birthDate"
          label="Date of Birth"
          inputType="date"
        />

        <InputField
          control={control}
          inputName="gender"
          label="Gender"
          inputType="text"
          placeholder="Enter your gender"
        />

        <div className="signup-btn">
          <Button
            variant="primary"
            type="submit"
            label="Sign Up"
            loading={loading}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpCustomer;
