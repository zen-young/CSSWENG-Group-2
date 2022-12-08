import React, { useState } from "react";
import { Center, Box, Divider } from "@mantine/core";
import OrderDetails from "../order_pages/order_details";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const [isSelected, setIsSelected] = useState("Self Pickup");

  const handleSubmit = () => {
    localStorage.setItem("cart_old", JSON.stringify(cart));
  };

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row w-full px-[120px] py-2 min-h-[500px]">
        <div className="basis-1/2 p-8">
          <div className="flex justify-between">
            <Center inline>
              <Box component="span" mx={15}>
                <h1 className="font-bold w-fit">Order Form</h1>
              </Box>
            </Center>
          </div>
          <Divider mb={10} />

          <form
            action="/cart/confirm"
            id="order_form"
            className="w-full mt-[20px]"
            method="get"
            onSubmit={handleSubmit}
          >
            {/* FULL NAME*/}
            <div className="flex mb-[20px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Full Name:
              </p>
              <div className="w-4/5 flex justify-between">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="p-2 border border-black rounded-sm mt-[5px] ml-4 w-2/5"
                  required
                  maxLength={32}
                />
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="p-2 border border-black rounded-sm mt-[5px] w-2/5"
                  required
                  maxLength={32}
                />
              </div>
            </div>

            {/* Phone Number*/}
            <div className="flex mb-[20px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Phone Number:
              </p>
              <div className="w-4/5 flex">
                <input
                  type="tel"
                  inputMode="tel"
                  name="phone_no"
                  placeholder="XXXXXXXXXX"
                  className="p-2 border border-black rounded-sm mt-[5px] mx-4 w-2/5"
                  required
                  minLength={11}
                  maxLength={11}
                  pattern="[0-9]{11}"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex mb-[20px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Email:
              </p>
              <div className="w-4/5 flex">
                <input
                  type="email"
                  inputMode="email"
                  name="email"
                  placeholder="sample@email.com"
                  className="p-2 border border-black rounded-sm mt-[5px] ml-4 w-full"
                  required
                />
              </div>
            </div>

            {/* Mode of Delivery */}
            <div className="flex mb-[20px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Mode of Delivery:
              </p>
              <div className="w-4/5 flex">
                <select
                  name="delivery"
                  id="delivery"
                  onChange={(e) => {
                    setIsSelected(e.target.value);
                  }}
                  className="p-2 border border-black rounded-sm mt-[5px] ml-4 w-full"
                  defaultValue="Self Pickup"
                  required
                >
                  <option value="Self Pickup">Self Pickup</option>
                  <option value="Same-Day Delivery">Same-Day Delivery</option>
                  <option value="Shipping">Shipping</option>
                </select>
              </div>
            </div>

            {/* Address */}
            {isSelected !== "Self Pickup" && (
              <>
                <div className="flex mb-[20px] w-full h-auto items-center">
                  <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Shipping Address:
                  </p>
                  <div className="w-4/5 flex">
                    <input
                      type="text"
                      name="address"
                      placeholder="House No, Building, Street, Subdivision, Barangay"
                      className="p-2 border border-black rounded-sm mt-[5px] ml-4 w-full"
                      required
                      maxLength={128}
                    />
                  </div>
                </div>

                {/* City, & Province */}
                <div className="flex mb-[20px] w-full h-auto items-center">
                  <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                    {/* Placeholder */}
                  </p>
                  <div className="w-4/5 flex justify-between">
                    <input
                      type="text"
                      name="city"
                      placeholder="City/Municipality"
                      className="p-2 border border-black rounded-sm mt-[5px] ml-4 w-2/5"
                      required
                      maxLength={128}
                    />
                    <input
                      type="text"
                      name="province"
                      placeholder="Province"
                      className="p-2 border border-black rounded-sm mt-[5px] w-2/5"
                      required
                      maxLength={128}
                    />
                  </div>
                </div>

                {/* ZIP Code*/}
                <div className="flex mb-[20px] w-full h-auto items-center">
                  <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                    {/* Placeholder */}
                  </p>
                  <div className="w-4/5 flex">
                    <input
                      type="text"
                      inputMode="numeric"
                      name="zip_code"
                      placeholder="Zip Code"
                      className="p-2 border border-black rounded-sm mt-[5px] mx-4 w-2/5"
                      required
                      minLength={4}
                      maxLength={4}
                      pattern="[0-9]{4}"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Payment Method */}
            <div className="flex mb-[20px] w-full h-auto items-center">
              <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                Payment Method:
              </p>
              <div className="w-4/5 flex">
                <select
                  name="payment"
                  className="p-2 border border-black rounded-sm mt-[5px] ml-4 w-full"
                  defaultValue="Cash on Delivery"
                  required
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Cheque">Cheque</option>
                  <option value="GCash">GCash</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="basis-1/2 p-8">
          <OrderDetails cart={cart} />
        </div>
      </div>

      <div className="flex justify-center hover:no-underline w-full">
        <div className="flex justify-center hover:no-underline w-5/8">
          <button
            form="order_form"
            className="bg-black text-white px-12 py-3 mt-[20px] text-[24px] w-full font-bold uppercase rounded-md
                            hover:bg-gray-600 hover:shadow-lg hover:transition duration-300"
            id="proceed"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
}
