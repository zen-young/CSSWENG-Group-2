import React, { useState } from "react";
import {
  Center,
  Box,
  Divider,
} from "@mantine/core";
import OrderDetails from "../order_pages/order_details";
import H_Divider from "../homepage/H_Divider";

export default function OrderConfirm() {

// TODO: Only Display Address if address value is not null
  const [hasAddress, setHasAddress] = useState(true);

  return (
    <>
      <header className="mt-9 mb-1 w-full">
        <div className="px-[120px] flex justify-between">
          <Center inline>
            <Box component="span" mx={15}>
              <span className="font-bold w-fit text-3xl">
                Please screenshot this page and e-mail it to us at upscale.printing@gmail.com 
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
        <Divider mb={10}/>

        <form action="" id="order_form" className="w-full mt-[20px]">
            {/* FULL NAME*/}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Full Name:
                </p>
                <div className="w-4/5 flex justify-between">
                    <span>[last_name], [first_name]</span>
                </div>

            </div>

            {/* Phone Number*/}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Phone Number:
                </p>
                <div className="w-4/5 flex">
                    <span>[phone_no]</span>
                </div>
            </div>

            {/* Email */}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Email:
                </p>
                <div className="w-4/5 flex">
                    <span>[email]</span>
                </div>
            </div>

            {/* Mode of Delivery */}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Mode of Delivery:
                </p>
                <div className="w-4/5 flex">
                    <span>[delivery]</span>
                </div>
            </div>

            {/* Address */}
            { hasAddress && <>
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Shipping Address:
                </p>
                <div className="w-4/5 flex">
                    <span>[address]</span>
                </div>
            </div>


            {/* City, & Province */}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                    {/* Placeholder */}
                </p>
                <div className="w-4/5 flex justify-between">
                    <span>[city], [province]</span>
                </div>
            </div>

            {/* ZIP Code*/}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                    {/* Placeholder */}
                </p>
                <div className="w-4/5 flex">
                    <span>[zip_code]</span>
                </div>
            </div>
            </>
            }

            {/* Payment Method */}
            <div className="flex mb-[10px] w-full h-auto items-center">
                <p className="w-2/5 text-[20px] align-top text-right pr-[25px] font-bold">
                    Payment Method:
                </p>
                <div className="w-4/5 flex">
                    <span>[payment]</span>
                </div>
            </div>
        </form>

        </div>
        <div className="basis-1/2 p-8">
          {/* TODO: Retrieve values from db */}
          <OrderDetails
            orderList={null}
            hasEditCart={false}
          />

        </div>
        
    </div>

    <H_Divider />

    <div className="w-full">
        <div className="px-32 w-full text-lg">
            <p>
                Alongside this form, <b>kindly attach the images and/or text</b> to be printed on the product. If there are multiple products, 
                indicate which image/text will be printed in which product.
            </p>
            
            <p className="mt-4">
                Images should be the following:
            </p>
            <ul className="ml-12 list-disc">
                <li>.png or .jpg format</li>
                <li>at least 300 dpi</li>
                <li>.125 bleed</li>
            </ul>

            <p className="mt-4">
                Once this form is sent, we will reply back to your email for confirmation and any further details.
            </p>

        </div>
        <div className="text-current px-12 mt-[32px] text-[24px] w-full font-bold uppercase rounded-md text-center">
            Thank You!
        </div>
    </div>
    </>
  );
}
