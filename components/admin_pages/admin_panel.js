import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

import Add_Product from "./add_products";
import Edit_Product from "./edit_products";
import Company_Info from "./company_info";
import Contact_Info from "./contact_info";
import ManageProducts from "./ManageProducts";
import Edit_Email from "./edit_profile/edit_email";
import Edit_Password from "./edit_profile/edit_password";

function Admin_Panel() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [hiddenWeb, setHiddenWeb] = useState(true);
  const [hiddenAdmin, setHiddenAdmin] = useState(true);

  //Default Page after logging in
  const [currPage, setCurrPage] = useState("Manage Products");
  const [currProduct, setCurrProduct] = useState("")
  const [pageIndex, setIndex] = useState(4);

  //Insert needed Pages into array
  const pages = [];
  pages.push({ pagename: "Add Product", html: <Add_Product setPages={setIndex} /> });
  pages.push({ pageName: "Edit Product", html: <Edit_Product setPages={setIndex} productName={currProduct}/> });
  pages.push({ pageName: "Edit Product", html: <Company_Info /> });
  pages.push({ pageName: "Edit Product", html: <Contact_Info /> });
  pages.push({ pageName: "Manage Products", html: <ManageProducts setPages={setIndex} setProduct={setCurrProduct}/> });
  pages.push({ pageName: "Edit Email", html: <Edit_Email /> });
  pages.push({ pageName: "Edit Password", html: <Edit_Password /> });

  return (
    <div className="flex px-[150px] w-full h-full min-h-screen shadow-lg bg-gray-200">
      <div className="text-white w-[350px] h-auto bg-[#282828] pl-[20px] pt-[25px] pb-[100px]">
        <div className="flex mb-[25px] items-center">
          <Image src={"/assets/user_icon.png"} width={60} height={60} />
          <p className="font-bold text-[30px] ml-[10px]">Admin</p>
        </div>

        <div className="flex items-center mb-[10px]">
          <Image src={"/assets/pencil_icon.png"} width={33} height={33} />
          <p
            onClick={() => {
              setCurrPage("Manage Products");
              setIndex(4);
              }
            }
            className={`${
              currPage == "Manage Products" ? "underline" : ""
            } hover:cursor-pointer font-semibold text-[24px] ml-[10px]`}
          >
            Manage Products
          </p>
        </div>

        <div className="flex  items-center mb-[10px]">
          <Image src={"/assets/web_icon.png"} width={33} height={33} />
          <p
            onClick={() => {
              setHiddenWeb(!hiddenWeb)
              setCurrPage("Manage Website");
            }}
            className={`${
              currPage == "Manage Website" ? "underline" : ""
            } hover:cursor-pointer font-semibold text-[24px] ml-[10px]`}
          >
            Manage Website
          </p>
        </div>

        <div className={`${hiddenWeb ? "hidden" : "visible"} mb-[20px] pl-[75px]`}>
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
            onClick={() => {
              setIndex(2);
            }}
          >
            Company Information
          </p>

          <p
            className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
            onClick={() => {
              setIndex(3);
            }}
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
          <Image src={"/assets/settings_icon.png"} width={33} height={33} />
          <p
            className={`${
              currPage == "Admin Settings" ? "underline" : ""
            } hover:cursor-pointer font-semibold text-[24px] ml-[10px]`}
            onClick={() => {
              setHiddenAdmin(!hiddenAdmin)
              setCurrPage("Admin Settings")
            }}
          >
            Admin Settings
          </p>
        </div>

        <div className={`${hiddenAdmin ? "hidden" : "visible"} mb-[20px] pl-[75px]`}>
          <p
            className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
            onClick={() => {
              setIndex(5)
            }}
          >
            Change Email
          </p>

          <p
            className="font-semibold text-[20px] hover:underline hover:cursor-pointer"
            onClick={() => {
              setIndex(6)
            }}
          >
            Change Password
          </p>
        </div>

        <div className="flex  items-center">
          <Image src={"/assets/logout_icon.png"} width={33} height={33} />
          <p
            className="hover:cursor-pointer hover:underline font-semibold text-[24px] ml-[10px]"
            onClick={() => {logout()}}
          >
            Logout
          </p>
        </div>
      </div>

      {/* Pages Container */}
      <div className="w-2/3 h-full min-h-screen bg-gray-100">
        {/* 
                    CHANGE INDEX TO VIEW PAGE FROM PAGES ARRAY
                    index 0 = admin settings
                    index 1 = add products page
                    index 2 = edit/delete products page
                */}
        { pages[pageIndex].html }
      </div>
    </div>
  );
}

export default Admin_Panel;
