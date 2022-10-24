import Image from "next/image";
import React, { useState } from "react";
import ChevronDown from "../../public/assets/chevronDown.png";

const LabelSection = ({ sizes, quantities }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [openQuantityDropdown, setOpenQuantityDropdown] = useState(false);
  return (
    <div className="flex flex-col">
      <span className="text-[32px] font-bold">Stickers and Labels</span>
      <div className="border-b-[1px] border-b-black opacity-30 w-full mt-4" />

      <div className="mt-[19px] relative">
        <span className="text-[20px] font-bold">Size</span>
        <div className="w-full bg-white flex items-center border border-[#C1C1C1] p-2 mt-[7px]">
          <input
            value={sizes[selectedSize]}
            className="ml-5 bg-inherit outline-none border-none grow text-[20px] font-normal tracking-wide"
          />
          <Image
            src={ChevronDown}
            alt="down"
            className="w-7 h-7 object-contain hover:cursor-pointer"
            onClick={() => setOpenSizeDropdown((prev) => !prev)}
          />
        </div>

        {openSizeDropdown ? (
          <div className="absolute border border-[#C1C1C1] w-full z-10 bg-white h-44 overflow-scroll">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 hover:cursor-pointer hover:bg-gray-300 transition-all ease-in-out"
                onClick={() => {
                  setSelectedSize(index);
                  setOpenSizeDropdown(false);
                }}
              >
                <span className="text-[20px] mt-3 ml-2">{size}</span>
                <div className="border-b-[1px] border-b-black opacity-25 w-full" />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-[19px] relative">
        <span className="text-[20px] font-bold">Quantity</span>
        <div className="w-full bg-white flex items-center border border-[#C1C1C1] p-2 mt-[7px]">
          <input
            value={quantities[selectedQuantity] + " Pieces"}
            className="ml-5 bg-inherit outline-none border-none grow text-[20px] font-normal tracking-wide"
          />
          <Image
            src={ChevronDown}
            alt="down"
            className="w-7 h-7 object-contain hover:cursor-pointer"
            onClick={() => setOpenQuantityDropdown((prev) => !prev)}
          />
        </div>
        {openQuantityDropdown ? (
          <div className="absolute border border-[#C1C1C1] w-full z-2 bg-white h-44 overflow-scroll">
            {quantities.map((quantity, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 hover:cursor-pointer hover:bg-gray-300 transition-all ease-in-out"
                onClick={() => {
                  setSelectedQuantity(index);
                  setOpenQuantityDropdown(false);
                }}
              >
                <span className="text-[20px] mt-3 ml-2">{quantity} Pieces</span>
                <div className="border-b-[1px] border-b-black opacity-25 w-full" />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-[33px] flex items-center space-x-4">
        <span className="text-[32px] font-normal">Total: </span>
        <span className="text-[32px] font-bold">400</span>
      </div>

      <div className="flex mt-[31px] items-center justify-center w-full">
        <button className="bg-black text-white px-6 py-2 text-[24px] font-bold uppercase rounded-md">
          click here to order-ordering from
        </button>
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-[27px]">
        <span className="text-[20px] font-normal">
          Need a special order? Contact us on Viber
        </span>
        <span className="text-[20px]">
          at <strong>+63917-510-1023</strong>
        </span>
      </div>
    </div>
  );
};

export default LabelSection;
