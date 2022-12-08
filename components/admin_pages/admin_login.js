import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

function Admin_Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true)
  const [hiddenMsg, setHiddenMsg] = useState(true)

  const { user, login, passwordReset } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin/settings");
    }
  }, [router, user]);

  const handleLogin = async () => {
    try {
      setMessage("Logging in...");
      await login(email, password);
    } catch (err) {
      console.error(err);
      setMessage("Incorrect Email or Password");
    }
  };

  const handleForget = () => {
    if(email.length == 0)
      alert("Please Fill-up Email form first")
    else{
      passwordReset(email)
    }
  }

  return (
      <div className="relative bg-black w-full h-screen px-[200px]">
          <div className="relative flex-col bg-white h-full w-full">
              <div
                  className={`absolute bg-black bg-opacity-80 w-full h-full ${
                      hidden ? "hidden" : ""
                  }`}
              >
                  <div className="flex flex-col w-1/2 h-auto mx-auto my-40 bg-white rounded-[10px] p-5 text-center justify-center">
                      <p className="text-[32px] font-semibold">
                          Reset Password
                      </p>
                      <div className="w-full h-[1px] bg-black mb-5 mx-auto" />
                      <p className="mb-5 text-[18px]">
                          To reset your password, please enter the <span className="text-red-500">EMAIL</span> of your account below, then press{" "}
                          <span className="text-green-500">SEND</span>.
                      </p>
                      <div className="flex justify-center">
                        <input
                          type="text"
                          className="w-1/2 px-2 py-2 border border-black mx-auto mb-5 rounded-md"
                          placeholder="Enter you email address..."
                          onChange={(e) => {
                              setEmail(e.target.value);
                          }}
                        />
                        <button
                            className="border border-black w-1/4 mx-auto mb-5 py-2 px-5 text-[16px] rounded-lg bg-gray-300 hover:brightness-90"
                            onClick={() => {
                                if (email.length == 0)
                                    alert("Please Enter an Email First");
                                else {
                                    handleForget()
                                }
                            }}
                        >
                            Send
                        </button>
                      </div>
                      
                      <p className="text-[18px]">
                          A <span className="font-semibold">Password Reset notice</span> will be sent to your designated email.
                      </p>
                      <p className="mb-5 text-[18px]">
                          If the password reset notice is not found in the inbox, <span className="font-semibold">please check your spam folder.</span>
                      </p>
                      <p className="text-red-500 mb-5">
                          *You may change your password after clicking the
                          link in the email*
                      </p>
                      
                      <div className="w-full h-[1px] bg-black mb-5 mx-auto" />
                      <p className="mb-3 text-[18px]">
                          If you still need help, contact <span className="font-semibold underline">Admin Support.</span>
                      </p>

                      <p 
                        className="underline hover:text-violet-500 cursor-pointer w-fit mx-auto"
                        onClick={() => {setHidden(true)}}
                      >
                        Return to Login.
                      </p>
                  </div>
              </div>

              <p className="text-[40px] font-bold text-center mb-10 pt-10">
                  Upscale Printing Solutions
              </p>

              <div className="border border-black rounded-[20px] w-1/2 mx-auto bg-[#F5F5F5] py-10 px-20">
                  <div className="flex text-center align-middle justify-center gap-5 mb-2">
                      <img
                          src="/assets/user_icon_2.png"
                          alt=""
                          className="w-[40px] h-[40px] my-auto"
                      />
                      <p className="font-bold text-[30px] text-center my-auto">
                          Admin Login
                      </p>
                  </div>
                  <div className="w-full h-[1px] bg-black" />

                  <p className="text-center mb-3 text-red-600">{message}</p>
                  <div className="flex-col w-full">
                      <p className="text-[16px] font-bold mb-2">
                          Username / Email
                      </p>

                      <input
                          type="text"
                          className="w-full rounded-sm border border-black mb-10 p-3"
                          placeholder="Enter email address..."
                          onChange={(e) => {
                              setEmail(e.target.value);
                          }}
                          value={email}
                      />

                      <p className="text-[16px] font-bold mb-2">Password</p>
                      <input
                          type="password"
                          className="w-full rounded-sm border border-black mb-10 p-3"
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
                          className="bg-gray-300 w-full py-[15px] text-[20px] font-bold rounded-md hover:brightness-95"
                          onClick={() => handleLogin()}
                      >
                          Login
                      </button>

                      <p
                          className="flex justify-center text-center mt-5 text-violet-700 font-bold hover:underline cursor-pointer"
                          onClick={() => {
                              setHidden(false);
                          }}
                      >
                          Forgot Password ?
                      </p>

                      <div className="flex justify-center text-center mt-5 text-violet-600 font-bold hover:underline">
                          <Link href="/">Back to Home Page</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Admin_Login;
