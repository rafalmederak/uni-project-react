import { LoginProps } from "interfaces/Login";
import { User } from "interfaces/User";
import React, { useState } from "react";
import "styles/login.css";

const Login = ({ users, setCurrentUser }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const correctPassword = "uni";
    const correctUser = users.find((user: User) => user.email === email);

    if (password === correctPassword && email === correctUser?.email) {
      setCurrentUser(correctUser);
    } else {
      alert("Incorrect password or email");
    }
  };

  return (
    <div className="login-container">
      <h1>React Project Uni</h1>
      <form className="login-form-wrapper">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
