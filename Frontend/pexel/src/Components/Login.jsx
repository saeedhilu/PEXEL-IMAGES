import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import instance from "./AxiosApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const otpChange = (e, digit) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      setOtp({ ...otp, [digit]: value });
      if (value && digit !== "digit4") {
        const nextInput = document.getElementById(
          `otp-${parseInt(digit.slice(-1)) + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackspace = (e, digit) => {
    if (e.key === "Backspace" && !otp[digit]) {
      const prevInput = document.getElementById(
        `otp-${parseInt(digit.slice(-1)) - 1}`
      );
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSendOtpClick = async () => {
    setErrorMessage("");
    try {
      const response = await instance.post("api/login/", { email });
      console.log("Email sent successfully!", response.data);
      setShowOtpInput(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtpClick = async () => {
    const fullOtp = `${otp.digit1}${otp.digit2}${otp.digit3}${otp.digit4}`;
    setErrorMessage("");
    try {
      const response = await instance.post("api/verify-otp/", { otp: fullOtp });
      console.log("OTP verified successfully!", response.data);
      navigate("/");
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const handleButtonClick = showOtpInput
    ? handleVerifyOtpClick
    : handleSendOtpClick;

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">SignIn</h1>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={emailChange}
        />
        {showOtpInput && (
          <div className="otp-container">
            {["digit1", "digit2", "digit3", "digit4"].map((digit, index) => (
              <input
                key={index}
                id={`otp-${index + 1}`}
                className="otp-input"
                type="text"
                placeholder="-"
                maxLength="1"
                value={otp[digit]}
                onChange={(e) => otpChange(e, digit)}
                onKeyDown={(e) => handleBackspace(e, digit)}
              />
            ))}
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="login-button" onClick={handleButtonClick}>
          {showOtpInput ? "Verify OTP" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default Login;
