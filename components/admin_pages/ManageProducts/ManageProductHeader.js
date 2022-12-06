import React from "react";

const ManageProductHeader = ({ setPages }) => {
  return (
    <div className="flex bg-[#282828] w-full h-[100px] items-center justify-between">
      <p className="text-[26px] text-white ml-[25px] font-semibold">Products</p>
      <button
        className="bg-[#f3f2f2] text-black font-normal text-[16px] text-center py-[10px] px-[18px] mr-[75px]"
        onClick={() => {
          setPages(1);
        }}
      >
        + Add New
      </button>
    </div>
  );
};

export default ManageProductHeader;
