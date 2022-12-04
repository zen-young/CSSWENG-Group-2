import React, { useState } from "react";
import { IconShoppingCart, IconTrash } from "@tabler/icons";
import {
  Center,
  Box,
  Button,
  Checkbox,
  Anchor,
} from "@mantine/core";
import H_Divider from "../homepage/H_Divider";
import OrderSummary from "../order_pages/order_summary";
import OrderCards from "../order_pages/order_card";

export default function Cart() {
  return (
    <>
      <header className="mt-9 mb-1 w-full">
        <div className="px-[120px] flex justify-between">
          <Center inline>
            <IconShoppingCart size="46px" color="#292929" />
            <Box component="span" mx={15}>
              <h1 className="font-bold w-fit">
                Your Cart
              </h1>
            </Box>
          </Center>
        </div>
        <H_Divider />
      </header>

      <div className="flex flex-col-reverse sm:flex-row w-full min-h-[400px] px-[120px] py-2">
        <div className="basis-2/3 p-8">
          <div className="w-full order p-2 px-6 border-solid border-2 border-current rounded-md flex justify-between">
            <Checkbox
                label="Select All Items"
                className="font-bold my-auto"
                color="gray"
                size="md"
            />

            <button className="text-red-600 px-8 py-1 font-bold rounded-md
                              hover:underline flex items-center"
                    id="delete-all-items"
            >
              <IconTrash /><span className="pt-0.5">&nbsp;Delete Selected Items</span>
            </button>

          </div>

        {/* TODO: get all ordered products from db */}
        <OrderCards />

        </div>
        <div className="basis-1/3 p-8">
          {/* TODO: Retrieve values from db */}
          <OrderSummary
            itemcount={2}
            totalprice={400}
            quotecount={1}
          />

          <Anchor href="/orderdetails">
          <button className="bg-black text-white px-12 py-3 mt-[20px] text-[24px] w-full font-bold uppercase rounded-md
                            hover:bg-gray-600 hover:shadow-lg hover:transition duration-300"
                  id="proceed"
          >
            Proceed to Checkout
          </button>
          </Anchor>
        </div>
      </div>
    </>
  );
}
