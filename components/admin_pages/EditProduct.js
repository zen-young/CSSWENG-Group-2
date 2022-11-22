import Image from "next/image";
import React, { useState } from "react";
import EditProductSpecification from "./EditProductSpecification/EditProductSpecification";

const EditProduct = ({ name, categories }) => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "/assets/image1.png",
    },
    {
      id: 2,
      src: "/assets/image2.png",
    },
    {
      id: 3,
      src: "/assets/image1.png",
    },
  ]);

  const deleteImage = (deleteId) => {
    setImages(images.filter((image) => image.id !== deleteId));
  };
  return (
    <>
      <div className="flex bg-[#282828] w-full h-[100px] items-center justify-between">
        <p className="text-[26px] text-white ml-[25px] font-semibold">
          Edit Products Details
        </p>
        <button className="bg-[#3cbccd] text-black font-bold text-[16px] text-center py-[10px] px-[18px] mr-[75px]">
          Live Preview
        </button>
      </div>

      <div className="mt-[27px] flex flex-col pr-[45px]">
        <div className="flex">
          <span className="text-[24px] whitespace-nowrap ml-[80px] font-normal text-black leading-[25px]">
            Product Images:
          </span>
          <div className="flex space-x-[10px] ml-[30px]">
            {images.map((image, index) => (
              <div key={image.id} className="relative">
                <Image
                  src={image.src}
                  alt="img"
                  height="80px"
                  width="140px"
                  objectFit="contain"
                />
                {index === images.length - 1 ? (
                  <div className="absolute bg-white opacity-[0.4] top-0 left-0 flex items-center justify-center w-full h-full">
                    <span
                      className="font-normal text-[24px] leading-[40px] hover:cursor-pointer"
                      onClick={() => deleteImage(image.id)}
                    >
                      X
                    </span>
                  </div>
                ) : null}
              </div>
            ))}

            <div className="border border-dashed h-[80px] border-black bg-white flex flex-col items-center px-[20px]">
              <Image
                src="/assets/addImage.png"
                alt="add"
                height="55px"
                width="61px"
                objectFit="contain"
              />
              <span className="font-normal whitespace-nowrap text-black text-[14px] mt-">
                Add Image
              </span>
            </div>
          </div>
        </div>
        <div className="flex mt-[30px] w-full">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Product Name:
          </span>

          <input
            className="w-full border ml-[53px] border-black rounded-[5px] text-[20px] font-normal leading-[20px] py-[9px] px-[13px]"
            placeholder={name}
          />
        </div>

        <div className="flex w-full mt-[34px]">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Category:
          </span>

          <select className="w-full border ml-[53px] border-black rounded-[5px] text-[20px] font-normal leading-[20px] py-[9px] px-[13px]">
            {categories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex w-full mt-[25px]">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Featured:
          </span>
          <div className="w-full flex ml-[52px]">
            <input type="checkbox" />
          </div>
        </div>

        <div className="flex mt-[27px] w-full">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Product Description:{" "}
          </span>

          <div className="flex flex-col ml-[52px] space-y-1 w-full border border-black p-2">
            <EditProductSpecification
              title="Contents"
              text="Personalized Stickers with Diecut"
            />

            <EditProductSpecification
              title="Sizes"
              text="2.4x1.25, 2.4x2, or 3.5x2"
            />

            <EditProductSpecification
              title="Paper"
              text="Glossy or matte waterproof and scratch proof vinyl stickers"
            />

            <EditProductSpecification
              title="Packaging"
              text="A4 Sheets in resealable plastic"
            />
          </div>
        </div>

        <div className="flex mt-[30px] w-full">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Product Sizes:
          </span>
          <div className="flex flex-col space-y-2 w-full ml-[53px]">
            <input className="w-full border border-black rounded-[5px] text-[20px] font-normal leading-[20px] py-[9px] px-[13px]" />
            <button className="text-center w-full py-2 font-bold bg-[#c7fffc] text-black text-[20px] leading-[24px] border border-black rounded-md">
              ADD PRODUCT SIZE
            </button>
          </div>
        </div>

        <div className="flex mt-[30px] w-full">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Paper Type:
          </span>
          <div className="flex flex-col space-y-2 w-full ml-[53px]">
            <input className="w-full border border-black rounded-[5px] text-[20px] font-normal leading-[20px] py-[9px] px-[13px]" />
            <button className="text-center w-full py-2 font-bold bg-[#c7fffc] text-black text-[20px] leading-[24px] border border-black rounded-md">
              ADD PAPER TYPE
            </button>
          </div>
        </div>

        <div className="flex mt-[40px] w-full mb-[70px]">
          <span className="whitespace-nowrap w-[45%] text-end font-normal text-[24px] text-black">
            Variations:
          </span>

          <div className="w-full flex flex-col ml-[53px]">
            <div className="flex justify-between items-center mb-[20px]">
              <span className="text-[24px] font-normal leading-[28px] text-black">{`Product Size:`}</span>
              <span className="text-[24px] font-normal leading-[28px] text-black">{`Quantity (pcs):`}</span>
              <span className="text-[24px] font-normal leading-[28px] text-black mr-8">{`Price:`}</span>
            </div>

            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-[20px]"
              >
                <select className="border border-black py-1 w-[20%] ml-5 rounded"></select>
                <input className="border border-black py-1 w-[20%] rounded" />
                <input className="border border-black py-1 w-[20%] rounded" />
              </div>
            ))}

            <button className="text-center w-full py-2 font-bold bg-[#c7fffc] text-black text-[20px] leading-[24px] border border-black rounded-md">
              ADD ROW
            </button>

            <div className="flex items-center mt-[40px] w-full justify-between space-x-[18px]">
              <button className="bg-[#d9d9d9] text-center text-black font-bold text-[12px] leading-[14px] py-[10px] px-[19px]">
                DISCARD CHANGES
              </button>
              <button className="bg-[#3dcd53] text-center text-black font-normal text-[12px] leading-[14px] py-[10px] px-[19px]">
                SAVE
              </button>
              <button className="bg-[#fc2829] text-center text-white font-normal text-[12px] leading-[14px] py-[10px] px-[19px]">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
