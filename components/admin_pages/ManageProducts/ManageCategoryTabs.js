import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import DeleteModal from "../../Modal/DeleteModal";
import RenameModal from "../../Modal/RenameModal";
import MenuPopup from "../MenuPopup";

const ManageCategoryTabs = ({
  categories,
  selected,
  setSelected,
  setOpenAddModal,
  setItemData,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cordinates, setCordinates] = useState({ x: "", y: "" });
  const [dataToChange, setDataToChange] = useState({});
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  const handleCategoryDelete = () => {
    getDocs(collection(db, "categories")).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        if (document.id === dataToChange.id) {
          deleteDoc(doc(db, "categories", document.id))
            .then(() => {
              console.log("document deleted");
              setOpenDeleteModal(false);
            })
            .catch((err) => console.log(err));
        }
      });
    });

    getDocs(collection(db, "products"))
      .then((snapshot) => {
        snapshot.docs.forEach((document) => {
          if (document.data().category === dataToChange.name) {
            updateDoc(doc(db, "products", document.id), { category: "" })
              .then(() => {
                console.log("Category removed from Products");
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .then(() => {
        setItemData((prev) =>
          prev.map((d) => {
            if (d.category === dataToChange.name) {
              return { ...d, category: "" };
            } else {
              return d;
            }
          })
        );
        setOpenDeleteModal(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex items-center mt-[32px] w-full overflow-x-scroll scrollbar-hide">
        <span
          className={`${
            selected === "viewAll" ? "font-bold" : "font-normal"
          } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer whitespace-nowrap`}
          onClick={() => setSelected("viewAll")}
        >
          View all
        </span>
        <span
          className={`${
            selected === "unrecog" ? "font-bold" : "font-normal"
          } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer whitespace-nowrap`}
          onClick={() => setSelected("unrecog")}
        >
          Uncategorized
        </span>
        {categories?.map((category) => (
          <span
            className={`${
              selected === category.name ? "font-bold" : "font-normal"
            } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer whitespace-nowrap relative`}
            onClick={() => setSelected(category.name)}
            onContextMenu={(e) => {
              e.preventDefault();
              setDataToChange(category);
              setCordinates({ x: e.pageX, y: e.pageY });
              setShowMenu(true);
            }}
            key={category.id}
          >
            {category.name}
          </span>
        ))}
        <span
          className={`${
            selected === "add" ? "font-bold" : "font-normal"
          } text-[14px] leading-[20px] text-black mr-[15px] hover:cursor-pointer whitespace-nowrap`}
          onClick={() => setOpenAddModal(true)}
        >
          + Add category
        </span>
      </div>

      {showMenu && (
        <MenuPopup
          cordinates={cordinates}
          setOpenRenameModal={setOpenRenameModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {openRenameModal && (
        <RenameModal
          type="rename"
          data={dataToChange}
          closeModal={() => setOpenRenameModal(false)}
          setData={setItemData}
        />
      )}

      {openDeleteModal && (
        <DeleteModal
          name={dataToChange.name}
          closeModal={() => setOpenDeleteModal(false)}
          description="Deleting this category will not delete the products listed under it. Once deleting this category, you can find its products in the Uncategorized tab."
          handleClick={handleCategoryDelete}
        />
      )}
    </>
  );
};

export default ManageCategoryTabs;
