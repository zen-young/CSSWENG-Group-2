import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import AddCategoryModal from "../../Modal/AddCategoryModal";
import DeleteModal from "../../Modal/DeleteModal";
import ManageProductCard from "./ManageProductCard/ManageProductCard";
import ManageProductHeader from "./ManageProductHeader";
import ManageCategoryTabs from "./ManageCategoryTabs";

const ManageProducts = ({ setPages, setProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [selected, setSelected] = useState("viewAll");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const handleSelectedDelete = () => {
    itemData.map((item) => {
      if (item.checked) {
        deleteDoc(doc(db, "products", item.id.replace(/^\s+/g, "")))
          .then(() => {
            setOpenDeleteProductModal(false);
            console.log("deleted");
          })
          .catch((err) => console.log(err));
      }
    });
    setItemData(itemData.filter((item) => item?.checked !== true));
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (querySnapshot) => {
      const tempCategories = [];
      querySnapshot.docs.forEach((document) => {
        tempCategories.push({ id: document.id, name: document.data().name });
      });
      setSelectedCategory(tempCategories[0]?.name);
      setCategories(tempCategories);
    });
    getDocs(collection(db, "products"))
      .then((snapshot) => {
        const temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setItemData(temp);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => unsub();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSelectedCategoryChange = () => {
    setItemData(
      itemData.map((item) => {
        if (item.checked) {
          updateDoc(doc(db, "products", item.id.replace(/^\s+/g, "")), {
            category: selectedCategory,
          });
          return { ...item, category: selectedCategory };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <>
      <ManageProductHeader setPages={setPages} />

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

            <select
              className="border border-black flex-grow ml-[12px] pt-[6px] pb-[3px] pl-[4px] text-gray-600"
              onChange={handleCategoryChange}
            >
              {categories.map((category, index) => (
                <option key={index}>{category.name}</option>
              ))}
            </select>

            <button
              className="text-black font-bold text-[12px] leading-[14px] text-center bg-[#d9d9d9] pt-[7px] pb-[3px] px-[19px] ml-[25px] mr-[15px]"
              onClick={handleSelectedCategoryChange}
            >
              Move
            </button>
          </div>

          <button
            className="flex items-center bg-[#fc2829] border border-black text-white font-bold text-[14px] leading-[32px] py-[3px] px-[14px]"
            onClick={() => setOpenDeleteProductModal(true)}
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

        <ManageCategoryTabs
          selected={selected}
          setSelected={setSelected}
          setOpenAddModal={setOpenAddModal}
          categories={categories}
          setItemData={setItemData}
        />

        <div className="mt-[9px] mb-[25px] w-full border-b border-b-black" />

        {selected === "viewAll"
          ? itemData?.map((item) => (
              <ManageProductCard
                key={item.id}
                allData={itemData}
                setItemData={setItemData}
                data={item}
                setPages={setPages}
                setProduct={setProduct}
                categories={categories}
              />
            ))
          : selected === "unrecog"
          ? itemData?.map((item) =>
              item.category === "" ? (
                <ManageProductCard
                  key={item.id}
                  allData={itemData}
                  setItemData={setItemData}
                  data={item}
                  setPages={setPages}
                  setProduct={setProduct}
                  categories={categories}
                />
              ) : null
            )
          : itemData?.map((item) =>
              item.category === selected ? (
                <ManageProductCard
                  key={item.id}
                  allData={itemData}
                  setItemData={setItemData}
                  data={item}
                  setPages={setPages}
                  setProduct={setProduct}
                  categories={categories}
                />
              ) : null
            )}
      </div>
      {openDeleteProductModal && (
        <DeleteModal
          name={itemData.name}
          closeModal={() => setOpenDeleteProductModal(false)}
          description="Selected products will be deleted, it will be permanently removed and can no longer be recovered."
          handleClick={handleSelectedDelete}
        />
      )}
      {openAddModal && (
        <AddCategoryModal closeModal={() => setOpenAddModal(false)} />
      )}
    </>
  );
};

export default ManageProducts;
