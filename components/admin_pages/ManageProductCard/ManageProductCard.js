import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { db } from "../../../firebaseConfig";
import EditProduct from "../edit_products";

const ManageProductCard = ({
  setPages,
  setProduct,
  data,
  allData,
  setItemData,
  categories,
}) => {

  const [checked, setChecked] = useState(false);

  const handleDelete = () => {
    deleteDoc(doc(db, "products", data.id.replace(/^\s+/g, "")))
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.log(err));
    setItemData(allData.filter((item) => item.id !== data.id));
  };

  const handleCheck = () => {
    setItemData(
      allData.map((item) => {
        if (item.id === data.id) {
          return { ...item, checked: item.checked === true ? false : true };
        } else {
          return item;
        }
      })
    );
  };

  const handleFeaturedClick = () => {
    updateDoc(doc(db, "products", data.id.replace(/^\s+/g, "")), {
      featured: !data.featured,
    })
      .then((document) => {
        console.log("doc updated");
      })
      .catch((err) => console.log(err));
    setItemData(
      allData.map((item) => {
        if (item.id === data.id) {
          return { ...item, featured: !item.featured };
        } else {
          return item;
        }
      })
    );
  };

  const changeCategory = (e) => {
    if (e.target.value !== data.category) {
      updateDoc(doc(db, "products", data.id.replace(/^\s+/g, "")), {
        category: e.target.value,
      }).then(() => {
        setItemData(
          allData.map((item) => {
            if (item.id === data.id) {
              return { ...item, category: e.target.value };
            } else {
              return item;
            }
          })
        );
      });
    }
  };

  return (
    <div className="w-full bg-[#f0efef] border border-black px-[25px] py-[20px] flex items-center justify-between mb-[40px]">
      <div className="flex items-center">
        <div
          className="h-[24px] w-[24px] bg-[#d9d9d9] flex items-center justify-center hover:cursor-pointer"
          onClick={() => {
            setChecked((prev) => !prev);
            handleCheck();
          }}
        >
          {checked && (
            <Image
              src="/assets/checkGray.png"
              alt="check"
              width="18px"
              height="14px"
              objectFit="contain"
            />
          )}
        </div>

        <div className="ml-[24px]">
          <Image
            src={
              data.image_urls.length > 0
                ? data.image_urls[0]
                : "/assets/unrecogImage.png"
            }
            alt="picture"
            width="110px"
            height="110px"
            objectFit="contain"
          />
        </div>

        <div className="flex flex-col items-start justify-between ml-[30px]">
          <span className="text-[24px] leading-[29px] font-bold">
            {data.name}
          </span>
          <span className="text-[14px] text-[#686868] leading-[16px] font-medium mt-[3px]">
            {data.description}
          </span>

          <div className="flex items-center mt-[30px] space-x-[18px]">
            <button
              className="bg-[#d9d9d9] text-center text-black font-normal text-[12px] leading-[14px] py-[7px] px-[19px]"
              onClick={() => {
                setProduct(data.name)
                setPages(1)
              }
                // setPages([
                //   {
                //     pageName: "Edit Product",
                //     html: (
                //       <EditProduct
                //         name={data.name}
                //         categories={data.categories}
                //       />
                //     ),
                //   },
                // ])
              }
            >
              Edit
            </button>
            <button className="bg-[#d9d9d9] text-center text-black font-normal text-[12px] leading-[14px] py-[7px] px-[19px]">
              Live view
            </button>
            <button
              className="bg-[#fc2829] text-center text-white font-normal text-[12px] leading-[14px] py-[7px] px-[19px]"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <select
          className="border border-black flex-grow ml-[12px] pt-[6px] pb-[3px] pl-[4px] p-3 text-gray-600"
          onChange={changeCategory}
        >
          <option value={data.category}>{data.category}</option>
          {categories.map(
            (category) =>
              category.name !== data.category && (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              )
          )}
        </select>

        <div className="flex items-center space-x-[9px] mt-[21px]">
          <div
            className="h-[24px] w-[24px] bg-[#d9d9d9] flex items-center justify-center hover:cursor-pointer"
            onClick={handleFeaturedClick}
          >
            {data.featured && (
              <Image
                src="/assets/checkGray.png"
                alt="check"
                width="18px"
                height="14px"
                objectFit="contain"
              />
            )}
          </div>
          <span className="text-[16px] font-normal">Featured</span>
        </div>
      </div>
    </div>
  );
};

export default ManageProductCard;
