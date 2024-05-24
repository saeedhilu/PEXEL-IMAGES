import React,{useState} from "react";
import "./Login.css";

const Login = () => {
    const [email,setEmail] = useState('')

    const emailChange = (e) =>{
        console.log('====================================');
        console.log(e.target.value);
        console.log('====================================');
        setEmail(e.target.value)
    }
  const verifyEmail = () => {
    console.log("verify email");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">SignIn</h1>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your Email"
          onChange={emailChange}
        />
        <button className="login-button" onClick={verifyEmail}>
          send OTP
        </button>
      </div>
    </div>
  );
};

export default Login;
