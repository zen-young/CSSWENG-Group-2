import React from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword} from 'firebase/auth'
import { app, auth } from '../../firebaseConfig'

import { useRouter } from "next/router";

function Admin_Login() {

    const router = useRouter()

    const [message, setMessage] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {    
        let token = sessionStorage.getItem("User_Token");
        if (token) {
            router.push("/admin/settings");
        }
    }, []);

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            setMessage("Logging in...")
            sessionStorage.setItem("User_Token", response.user.accessToken);
            router.push('/admin/settings')

        }).catch((error) =>{
            console.log(error)
            setMessage("Incorrect Email or Password")
        })
    }

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
                        Username / Email Address
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
                            if(e.key === 'Enter')
                                login()
                        }}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                    />

                    <button
                        className="mt-[50px] bg-gray-300 w-full py-[15px] text-[20px] font-bold rounded-md hover:brightness-95"
                        onClick={() => login()}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Admin_Login;