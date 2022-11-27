import { addDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebaseConfig";

const AddCategoryModal = ({ closeModal }) => {
  const [categoryName, setCategoryName] = useState("");

  const addCategory = () => {
    setDoc(doc(db, "categories", categoryName), {
      name: categoryName,
    })
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
      <div className="bg-white flex flex-col items-start px-8 py-5 w-[500px] rounded">
        <div className="w-full flex justify-end items-center mb-5">
          <button
            className="bg-gray-800 text-white rounded p-2 hover:cursor-pointer"
            onClick={closeModal}
          >
            Close
          </button>
        </div>

        <span className="text-lg text-gray-700 font-bold">Add Category</span>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="px-4 py-2 border border-gray-200 w-full text-base font-medium outline-none rounded"
        />
        <button
          className={`${
            categoryName.trim(" ").length === 0 ? "bg-gray-500" : "bg-gray-600"
          } text-gray-100 text-center w-full mt-4 py-2 rounded`}
          disabled={categoryName.trim(" ").length === 0}
          onClick={addCategory}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
