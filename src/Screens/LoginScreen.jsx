import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginStatus, setLoginStatus] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  console.log("login status:- ", loginStatus);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userCredentials.email,
          password: userCredentials.password,
        }),
      });

      if (response.ok) {
        const token = await response.json();
        setLoginStatus("");
        localStorage.setItem("accessToken", token.accessToken);
        navigate("/");
        const data = await response.json();
      } else {
        const errorData = await response.json();
        setLoginStatus(errorData.error);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("register successful");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center bg-blue-600 text-white p-8">
            <h2 className="text-4xl font-bold">Health Connect</h2>
            <p className="text-sm mt-2">Your Hospital Management Solution</p>
          </div>

          {/* Form Section */}
          <div className="p-4 flex flex-col justify-center">
            <div className="grid w-full grid-cols-2 mb-4">
              <button
                className={`py-2 text-center ${
                  activeTab === "login"
                    ? "border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`py-2 text-center ${
                  activeTab === "register"
                    ? "border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </div>

            {activeTab === "login" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    onChange={onHandleChange}
                    value={userCredentials.email}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={userCredentials.password}
                    onChange={onHandleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <p className="text-red-700 text-start text-sm mb-0">
                  {loginStatus !== "" && "*" + loginStatus}
                </p>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring bg-blue-600 hover:bg-transparent text-white border hover:border-blue-600 hover:text-blue-600"
                >
                  Login
                </button>
              </form>
            )}

            {activeTab === "register" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleRegister}
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring bg-blue-600 hover:bg-transparent text-white border hover:border-blue-600 hover:text-blue-600"
                >
                  Register
                </button>
              </form>
            )}

            <div className="p-4">
              <div className="relative w-full mb-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
