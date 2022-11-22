import Image from "next/image";
import React, { useState } from "react";
import ManageProductCard from "./ManageProductCard/ManageProductCard";

const data = [
  {
    id: 1,
    name: "Stickers and Labels",
    description: "www.upscaleprintingsolutions.com/stickersandlabels",
    image: "/assets/unrecogImage.png",
    categories: ["category 1", "category 2"],
  },
  {
    id: 2,
    name: "Stickers and Labels",
    description: "www.upscaleprintingsolutions.com/stickersandlabels",
    image: "/assets/unrecogImage.png",
    categories: ["category 1", "category 2"],
  },
  {
    id: 3,
    name: "Stickers and Labels",
    description: "www.upscaleprintingsolutions.com/stickersandlabels",
    image: "/assets/unrecogImage.png",
    categories: ["category 1", "category 2"],
  },
];

const ManageProducts = ({ setPages }) => {
  const [categories, setCategories] = useState(["category 1", "category 2"]);
  const [itemData, setItemData] = useState(data);
  const [selected, setSelected] = useState(2);

  const handleSelectedDelete = () => {
    setItemData(itemData.filter((item) => item?.checked !== true));
  };
  return (
    <>
      <div className="flex bg-[#282828] w-full h-[100px] items-center justify-between">
        <p className="text-[26px] text-white ml-[25px] font-semibold">
          Products
        </p>
        <button className="bg-[#f3f2f2] text-black font-normal text-[16px] text-center py-[10px] px-[18px] mr-[75px]">
          + Add New
        </button>
      </div>

      <div className="flex flex-col w-full pt-[47px] pl-[57px] pr-[75px]">
        <div className="flex items-center space-x-[20px]">
          <div className="flex items-center flex-grow border border-black py-[3px]">
            <Image
              src="/assets/file.png"
              alt="icon"
              height="30px"
              width="44px"
              objectFit="contain"
              className="mt-[3px]"
            />
            <span className="font-bold text-[14px] text-black leading-[32px] ml-[12px]">
              Move Selected Items To:
            </span>

            <select className="border border-black flex-grow ml-[12px] pt-[6px] pb-[3px] pl-[4px] text-gray-600">
              {categories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>

            <button className="text-black font-bold text-[12px] leading-[14px] text-center bg-[#d9d9d9] pt-[7px] pb-[3px] px-[19px] ml-[25px] mr-[15px]">
              Move
            </button>
          </div>

          <button
            className="flex items-center bg-[#fc2829] border border-black text-white font-bold text-[14px] leading-[32px] py-[3px] px-[14px]"
            onClick={handleSelectedDelete}
          >
            <Image
              src="/assets/delete.png"
              alt="delete"
              height="18px"
              width="22px"
              objectFit="contain"
              className="mr-[14px]"
            />
            {` Delete Selected Items`}
          </button>
        </div>

        <div className="flex items-center mt-[32px]">
          <span
            className={`${
              selected === 1 ? "font-bold" : "font-normal"
            } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer`}
            onClick={() => setSelected(1)}
          >
            View all
          </span>
          <span
            className={`${
              selected === 2 ? "font-bold" : "font-normal"
            } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer`}
            onClick={() => setSelected(2)}
          >
            Unrecognized
          </span>
          <span
            className={`${
              selected === 3 ? "font-bold" : "font-normal"
            } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer`}
            onClick={() => setSelected(3)}
          >
            Category 1
          </span>
          <span
            className={`${
              selected === 4 ? "font-bold" : "font-normal"
            } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer`}
            onClick={() => setSelected(4)}
          >
            Category 2
          </span>
          <span
            className={`${
              selected === 5 ? "font-bold" : "font-normal"
            } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer`}
            onClick={() => setSelected(5)}
          >
            + Add category
          </span>
        </div>
        <div className="mt-[9px] mb-[25px] w-full border-b border-b-black" />

        {itemData?.map((item) => (
          <ManageProductCard
            key={item.id}
            allData={itemData}
            setItemData={setItemData}
            data={item}
            setPages={setPages}
          />
        ))}
        {/* <ManageProductCard
          titleText="Stickers and Labels"
          subtitleText="www.upscaleprintingsolutions.com/stickersandlabels"
          image="/assets/unrecogImage.png"
          categories={categories}
          setPages={setPages}
        />

        <ManageProductCard
          titleText="Stickers and Labels"
          subtitleText="www.upscaleprintingsolutions.com/stickersandlabels"
          image="/assets/unrecogImage.png"
          categories={categories}
          setPages={setPages}
        /> */}
      </div>
    </>
  );
};

export default ManageProducts;
