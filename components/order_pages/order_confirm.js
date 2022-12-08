import React from "react";
import { Center, Box, Divider } from "@mantine/core";
import OrderDetails from "../order_pages/order_details";
import H_Divider from "../homepage/H_Divider";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart.slice";

import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function OrderConfirm({ query }) {
  const cart = JSON.parse(localStorage.getItem("cart_old"));
  const hasAddress = query.delivery !== "Self Pickup";
  const dispatch = useDispatch();

  const [add_info, setAddInfo] = useState("")
  const [order_confirm, setConfirm] = useState("")

  dispatch(clearCart());

  function getData(){
    getDoc(doc(db, "website_information", "order_page")).then((res) => {
      var data = res.data()
      setAddInfo(data.additional_information)
      setConfirm(data.order_confirmation)
    })
  }

  useEffect(() => {
    getData()
    if(add_info){
      document.getElementById("additional_info").innerHTML = add_info
    }
  }, [add_info])


  return (
    <>
      <header className="mt-9 mb-1 w-full">
        <div className="px-[120px] flex justify-between">
          <Center inline>
            <Box component="span" mx={15}>
              <span className="font-bold w-fit text-3xl">
                {/* Please screenshot this page and e-mail it to us at
                upscale.printing@gmail.com */}
                {order_confirm}
              </span>
            </Box>
          </Center>
        </div>
        <H_Divider />
      </header>

      <div className="flex flex-col-reverse sm:flex-row w-full px-[120px]">
        <div className="basis-1/2 p-8">
          <div className="flex justify-between">
            <Center inline>
              <Box component="span" mx={15}>
                <span className="font-bold text-2xl">Customer Details</span>
              </Box>
            </Center>
          </div>
          <Divider mb={10} />

          <form action="" id="order_form" className="w-full mt-[20px]">
            {/* FULL NAME*/}
            <div className="flex mb-[10px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Full Name:
              </p>
              <div className="w-4/5 flex justify-between">
                <span>
                  {query.last_name}, {query.first_name}
                </span>
              </div>
            </div>

            {/* Phone Number*/}
            <div className="flex mb-[10px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Phone Number:
              </p>
              <div className="w-4/5 flex">
                <span>{query.phone_no}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex mb-[10px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Email:
              </p>
              <div className="w-4/5 flex">
                <span>{query.email}</span>
              </div>
            </div>

            {/* Mode of Delivery */}
            <div className="flex mb-[10px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Mode of Delivery:
              </p>
              <div className="w-4/5 flex">
                <span>{query.delivery}</span>
              </div>
            </div>

            {/* Address */}
            {hasAddress ? (
              <>
                <div className="flex mb-[10px] w-full h-auto items-center">
                  <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Shipping Address:
                  </p>
                  <div className="w-4/5 flex">
                    <span>{query.address}</span>
                  </div>
                </div>

                {/* City, & Province */}
                <div className="flex mb-[10px] w-full h-auto items-center">
                  <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                    {/* Placeholder */}
                  </p>
                  <div className="w-4/5 flex justify-between">
                    <span>
                      {query.city}, {query.province}
                    </span>
                  </div>
                </div>

                {/* ZIP Code*/}
                <div className="flex mb-[10px] w-full h-auto items-center">
                  <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                    {/* Placeholder */}
                  </p>
                  <div className="w-4/5 flex">
                    <span>{query.zip_code}</span>
                  </div>
                </div>
              </>
            ) : null}

            {/* Payment Method */}
            <div className="flex mb-[10px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Payment Method:
              </p>
              <div className="w-4/5 flex">
                <span>{query.payment}</span>
              </div>
            </div>
          </form>
        </div>
        <div className="basis-1/2 p-8">
          <OrderDetails cart={cart} />
        </div>
      </div>

      <H_Divider />

      <div className="w-full">
        <div className="px-32 w-full text-lg" id="additional_info" />
        <div className="text-current px-12 mt-[32px] text-[24px] w-full font-bold uppercase rounded-md text-center">
          Thank You!
        </div>
      </div>
    </>
  );
}
