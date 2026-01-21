import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ tokenHandle }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state for registration

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Move this to the top

    if (currentState == "Login") {
      try {
        const response = await axios.post(backendUrl + "/admin/login-admin", {
          email,
          password,
        });
        if (response.data.success === true) {
          tokenHandle(response.data.data.accessToken);
          toast.success("Admin Loggedin Success");
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid email or password");
      }
    } else {
      try {
        const response = await axios.post(
          backendUrl + "/admin/register-admin",
          {
            email,
            password,
          },
        );
        if (response.data.success === true) {
          setCurrentState("Login");
          // Registration doesn't return accessToken in your backend
          // So either:
          // 1. Auto-login after registration (call login API)
          // 2. Or just show success message
          toast.success("Admin created successfully! Please login.");

          // Clear form
          setEmail("");
          setPassword("");
        } else {
          toast.error("Registration failed");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 py-8 px-8 rounded-lg shadow-xl gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-3">
        <p className="prata-regular text-3xl ">Admin</p>
        <p className="prata-regular text-3xl ">{currentState}</p>
        <hr className="border-none h-1.5 w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" ? (
        <>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Username"
            required
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Create Password"
            required
          />
          <div className="w-full flex justify-between text-base mt-[-8px]">
            <p
              onClick={() => {
                setCurrentState("Login");
              }}
              className="cursor-pointer"
            >
              Already a User? Login here
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Changed placeholder from "Username" to "Email" */}
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-base mt-[-8px]">
            <p className="cursor-pointer">Forget Password?</p>
            <p
              onClick={() => {
                setCurrentState("Sign Up");
              }}
              className="cursor-pointer"
            >
              Create account
            </p>
          </div>
        </>
      )}
      <button
        type="submit" // Added type="submit"
        className="font-light bg-black text-white px-8 py-2 mt-4 cursor-pointer"
      >
        {currentState === "Login" ? "Sign in" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
