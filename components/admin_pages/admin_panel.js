
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

import Admin_Settings from "./admin_settings";
import Add_Product from "./add_products";
import Edit_Product from "./edit_products";

function Admin_Panel() {
    const auth = getAuth()
    const router = useRouter()
    const [hidden, setHidden] = useState(true);

    //Default Page after logging in
    const [currPage, setCurrPage] = useState("Admin Settings");

    //Insert needed Pages into array
    const pages = [];
    pages.push({ pageName: "Admin Settings", html: <Admin_Settings /> });
    pages.push({ pagename: "Add Product", html: <Add_Product />})
    pages.push({ pageName: "Edit Product", html: <Edit_Product />})

    useEffect(() => {
        let token = sessionStorage.getItem("User_Token");

        if(!token){
            router.push('/admin/login')
        }
    })

    const logout = () => {
        signOut(auth)
        .then(() =>{
            sessionStorage.removeItem("User_Token");
            router.push('/admin/login')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex px-[150px] w-full h-full shadow-lg bg-gray-200">
            <div className="text-white w-[350px] h-auto bg-[#282828] pl-[20px] pt-[25px] pb-[100px]">
                <div className="flex mb-[25px] items-center">
                    <Image
                        src={"/assets/user_icon.png"}
                        width={60}
                        height={60}
                    />
                    <p className="font-bold text-[30px] ml-[10px]">Admin</p>
                </div>

                <div className="flex items-center mb-[10px]">
                    <Image
                        src={"/assets/pencil_icon.png"}
                        width={33}
                        height={33}
                    />
                    <p
                        onClick={() => {
                            setCurrPage("Products");
                        }}
                        className={`${
                            currPage == "Products" ? "underline" : ""
                        } hover:cursor-pointer font-semibold text-[24px] ml-[10px]`}
                    >
                        Manage Products
                    </p>
                </div>

                <div className="flex  items-center mb-[10px]">
                    <Image
                        src={"/assets/web_icon.png"}
                        width={33}
                        height={33}
                    />
                    <p
                        onClick={() => {
                            hidden ? setHidden(false) : setHidden(true);
                            setCurrPage("Manage Website");
                        }}
                        className={`${
                            currPage == "Manage Website" ? "underline" : ""
                        } hover:cursor-pointer font-semibold text-[24px] ml-[10px]`}
                    >
                        Manage Website
                    </p>
                </div>

                <div
                    className={`${
                        hidden ? "hidden" : "visible"
                    } mb-[20px] pl-[75px]`}
                >
                    <p
                        className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
                        onClick={() => {}}
                    >
                        Home Page
                    </p>

                    <p
                        className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
                        onClick={() => {}}
                    >
                        Order Page
                    </p>

                    <p
                        className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
                        onClick={() => {}}
                    >
                        Company Information
                    </p>

                    <p
                        className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
                        onClick={() => {}}
                    >
                        Contact Information
                    </p>

                    <p
                        className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
                        onClick={() => {}}
                    >
                        View Website
                    </p>
                </div>

                <div className="flex items-center mb-[10px]">
                    <Image
                        src={"/assets/settings_icon.png"}
                        width={33}
                        height={33}
                    />
                    <p
                        className={`${
                            currPage == "Admin Settings" ? "underline" : ""
                        } hover:cursor-pointer font-semibold text-[24px] ml-[10px]`}
                        onClick={() => {
                            setCurrPage("Admin Settings");
                        }}
                    >
                        Admin Settings
                    </p>
                </div>

                <div className="flex  items-center">
                    <Image
                        src={"/assets/logout_icon.png"}
                        width={33}
                        height={33}
                    />
                    <p 
                        className="hover:cursor-pointer hover:underline font-semibold text-[24px] ml-[10px]"
                        onClick={() => logout()}
                    >
                        Logout
                    </p>
                </div>
            </div>

            {/* Pages Container */}
            <div className="w-2/3 h-auto bg-gray-100">
                {pages[2].html}
            </div>
        </div>
    );
}

export default Admin_Panel;