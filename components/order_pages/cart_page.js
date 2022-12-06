import React, { useRef } from "react";
import { IconShoppingCart, IconTrash } from "@tabler/icons";
import { Center, Box, Checkbox, Anchor, SimpleGrid } from "@mantine/core";
import H_Divider from "../homepage/H_Divider";
import OrderSummary from "../order_pages/order_summary";
import OrderCards from "../order_pages/order_card";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cart.slice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const hasItems = cart.length > 0;
  const checkBoxRefs = useRef([]);
  const dispatch = useDispatch();

  const removeUnusedRefs = () => {
    checkBoxRefs["current"] = checkBoxRefs.current.filter((ref) => ref);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const index = e.currentTarget.id.split("-")[2];
    dispatch(removeFromCart(cart[index]));
    removeUnusedRefs();
  };

  const handleDeleteSelected = () => {
    checkBoxRefs.current
      .filter((ref) => ref)
      .map((ref, index) => {
        if (ref.checked) {
          ref.checked = false;
          dispatch(removeFromCart(cart[index]));
        }
      });
    removeUnusedRefs();
  };

  const handleSelectAll = (e) => {
    removeUnusedRefs();
    if (e.currentTarget.checked) {
      checkBoxRefs.current.map((checkBoxRef) => {
        checkBoxRef.checked = true;
      });
    } else {
      checkBoxRefs.current.map((checkBoxRef) => {
        checkBoxRef.checked = false;
      });
    }
  };

  return (
    <>
      <header className="mt-9 mb-1 w-full">
        <div className="px-[120px] flex justify-between">
          <Center inline>
            <IconShoppingCart size="46px" color="#292929" />
            <Box component="span" mx={15}>
              <h1 className="font-bold w-fit">Your Cart</h1>
            </Box>
          </Center>
        </div>
        <H_Divider />
      </header>

      <div className="flex flex-col-reverse sm:flex-row w-full min-h-[440px] px-[120px] py-2">
        {hasItems ? (
          <>
            <div className="basis-2/3 px-8">
              <div className="w-full order p-2 px-6 border-solid border-2 border-current rounded-md flex justify-between">
                <Checkbox
                  label="Select All Items"
                  className="font-bold my-auto"
                  color="gray"
                  size="md"
                  onClick={handleSelectAll}
                />

                <button
                  className="text-red-600 px-4 py-1 font-bold rounded-md
                                    hover:underline flex items-center"
                  id="delete-all-items"
                  onClick={handleDeleteSelected}
                >
                  <IconTrash />
                  <span className="pt-0.5">&nbsp;Delete Selected Items</span>
                </button>
              </div>

              <SimpleGrid cols={1} py="xl">
                {cart.map((item, index) => (
                  <OrderCards
                    checkBoxRefs={checkBoxRefs}
                    key={index}
                    index={index}
                    item={item}
                    handleDelete={handleDelete}
                  />
                ))}
              </SimpleGrid>
            </div>

            <div className="basis-1/3 px-8">
              <OrderSummary cart={cart} />

              <Link href="/cart/checkout">
                <Anchor>
                  <button
                    className="bg-black text-white px-12 py-3 mt-[20px] text-[24px] w-full font-bold uppercase rounded-md
                                  hover:bg-gray-600 hover:shadow-lg hover:transition duration-300"
                    id="proceed"
                  >
                    Proceed to Checkout
                  </button>
                </Anchor>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-fit order p-2 px-6 border-solid border-2 border-current rounded-md">
              <h2 className="text-center italic text-xl">
                Your cart is empty.
              </h2>
            </div>
          </>
        )}
      </div>
    </>
  );
}
