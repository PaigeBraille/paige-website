import React, { useState } from "react";
import Graphic5 from "../public/svg/graphic-5.svg";

type LoginProps = {
  setAuthenticated: (value: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setAuthenticated }) => {
  const [password, setPassword] = useState("");
  const correctPassword = "Paige2024";

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl md:px-6">
      <div className="flex flex-col md:flex-row justify-between py-6 md:py-12 px-4">
        <div className="w-full md:w-1/2 pr-4">
          <h1 className="text-lg sm:text-xl md:text-3xl tracking-tight leading-tight font-extralight">
            Sit tight, we are building braille learning exercises for you!
          </h1>
          <div className="form-group text-center mt-4">
            <input
              type="password"
              className="border rounded-sm border-primary px-4 py-2 text-center w-2/3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-primary text-white font-bold rounded-sm py-2 px-4 mt-2 mx-2 hover:bg-blue-700"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center md:-mt-36">
            <Graphic5 className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;










