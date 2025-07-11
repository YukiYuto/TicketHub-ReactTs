import "@styles/authentication/SignUpCustomer.css";
// import { useState } from "react";

const SignUpCustomer = () => {
  // const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="signup-container">
      <h1>Sign Up Customer</h1>
      <form className="signup-form">
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Full Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="tel" />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" />
        </div>
        <div>
          <label>Address</label>
          <input type="text" />
        </div>
        <div>
          <label>Country</label>
          <input type="text" />
        </div>
        <div>
          <label>ID Number</label>
          <input type="text" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpCustomer;
