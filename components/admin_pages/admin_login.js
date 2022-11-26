import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

function Admin_Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/admin/settings");
    }
  }, []);

  const handleLogin = async () => {
    try {
      setMessage("Logging in...");
      await login(email, password);
      router.push("/admin/settings");
    } catch (err) {
      console.error(err);
      setMessage("Incorrect Email or Password");
    }
  };

  return (
    <div className="bg-black w-full h-auto px-[200px]">
      <div className="flex-col py-[100px] bg-gray-100">
        <h1 className="font-bold text-[40px] text-center mb-[25px]">
          Admin Login
        </h1>
        <p className="text-center mb-3 text-red-600">{message}</p>
        <div className="w-1/3 mx-auto">
          <label
            htmlFor="email"
            className="block text-[20px] font-bold mb-[10px] m-auto"
          >
            Email
          </label>

          <input
            type="text"
            name="email"
            id="email"
            className="w-full rounded-sm border border-black mb-[25px] p-3"
            placeholder="Enter email address..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <label
            htmlFor="password"
            className="block text-[20px] font-bold mb-[10px]"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full rounded-sm border border-black mb-[25px] p-3"
            placeholder="Enter password..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button
            className="mt-[50px] bg-gray-300 w-full py-[15px] text-[20px] font-bold rounded-md hover:brightness-95"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin_Login;
