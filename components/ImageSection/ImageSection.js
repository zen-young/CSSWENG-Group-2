import React, { useState } from "react";
import newImage from "../../public/assets/newImage.png";
import Musk1 from "../../public/assets/musk1.jpeg";
import Musk2 from "../../public/assets/musk2.jpeg";
import Musk3 from "../../public/assets/musk3.jpeg";
import ChevronLeft from "../../public/assets/chevronLeft.svg";
import ChevronRight from "../../public/assets/chevronRight.svg";
import Image from "next/image";

const ImageSection = ({ sizes, content, paperContent }) => {
  const [images, setImages] = useState([
    {
      src: newImage,
    },
    {
      src: Musk1,
    },
    {
      src: Musk2,
    },
    {
      src: Musk3,
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(0);
  // const sizes = ["2.4x1.25", "2.4x2", "3.5x2"];

  const prevImage = () => {
    if (selectedImage === 0) {
      setSelectedImage(images.length - 1);
    } else {
      setSelectedImage((prev) => prev - 1);
    }
  };
  const nextImage = () => {
    if (selectedImage === images.length - 1) {
      setSelectedImage(0);
    } else {
      setSelectedImage((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="w-full h-[388px] object-contain">
          <Image
            src={images[selectedImage].src}
            alt="selectedImage"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="border-b-[1px] border-b-black opacity-25 w-full mt-4" />
      <div className="flex items-center mt-4 justify-center space-x-2">
        <Image
          src={ChevronLeft}
          alt="left"
          className="mb-4 hover:cursor-pointer"
          onClick={prevImage}
        />
        {images.map((image, index) => (
          <div key={index} className={`w-24 h-24 object-contain`}>
            <Image
              src={image.src}
              alt="images"
              className={`hover:cursor-pointer w-full h-[80%] ${
                selectedImage === index ? "opacity-100" : "opacity-70"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          </div>
        ))}
        <Image
          src={ChevronRight}
          alt="rigth"
          className="mb-4 hover:cursor-pointer"
          onClick={nextImage}
        />
      </div>
      <div className="flex flex-col mt-3">
        <span className="text-[20px] font-bold">Product Details</span>
        <div className="list-item ml-6 mt-2">
          <div className="flex">
            <span className="text-[20px] font-bold">Contents: </span>
            <span className="ml-2 text-[20px] font-normal">{content}</span>
          </div>
        </div>
        <div className="list-item ml-6 mt-2">
          <div className="flex">
            <span className="text-[20px] font-bold">Size: </span>
            <span className="flex items-center">
              {sizes.map((size, index) => (
                <span key={size} className="ml-2 text-[20px] font-normal">
                  {size}
                  {index === sizes.length - 2 ? (
                    <span> or&nbsp;</span>
                  ) : index === sizes.length - 1 ? null : (
                    <span>,&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="list-item ml-6 mt-2">
          <div className="flex">
            <span className="text-xl font-bold">Paper: </span>
            <span className="ml-2 text-[20px] font-normal">{paperContent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
