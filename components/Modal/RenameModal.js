import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseConfig";

const RenameModal = ({ data, closeModal, setData }) => {
  const [newCategory, setNewCategory] = useState(data.name);
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const updateCategory = () => {
    getDocs(collection(db, "categories")).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        if (document.data().name === data.name) {
          updateDoc(doc(db, "categories", document.id), {
            name: newCategory,
          }).then(() => {
            console.log("success");
          });
        }
      });
    });

    getDocs(collection(db, "products"))
      .then((snapshot) => {
        snapshot.docs.forEach((document) => {
          if (document.data().category === data.name) {
            updateDoc(doc(db, "products", document.id), {
              category: newCategory,
            })
              .then(() => {
                console.log("Category updated in Product");
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .then(() => {
        setData((prev) =>
          prev.map((item) => {
            if (item.category === data.name) {
              return { ...item, category: newCategory };
            } else {
              return item;
            }
          })
        );
        closeModal();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-10">
      <div
        ref={ref}
        className="bg-white flex flex-col mt-48 ml-48 items-start px-[22px] py-[20px] w-[500px] rounded z-10"
      >
        <span className="text-[24px] font-bold text-black">
          Rename Category
        </span>

        <div className="w-full border-b-black border-b" />

        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="mb-[28px] mt-[21px] w-full border-black border outline-none text-[24px] font-normal text-black px-[8px] py-[5px]"
        />

        <div className="flex items-center justify-end w-full space-x-3">
          <button
            className="w-[99px] text-center rounded-md py-[3px] text-black font-normal text-[16px] bg-[#a8a8a8]"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="w-[99px] text-center rounded-md py-[3px] text-black font-bold text-[16px] bg-[#3dcd53]"
            onClick={updateCategory}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
