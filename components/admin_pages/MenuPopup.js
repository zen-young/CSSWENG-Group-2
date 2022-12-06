import React from "react";
import Modal from "../Modal/RenameModal";

const MenuPopup = ({ cordinates, setOpenRenameModal, setOpenDeleteModal }) => {
  return (
    <>
      <div
        className={`pt-[13px] pb-[18px] px-[16px] flex flex-col justify- bg-white w-[227px] shadow-lg`}
        style={{
          position: "absolute",
          top: `${cordinates.y + 20}px`,
          left: `${cordinates.x - 20}px`,
        }}
      >
        <span
          className="font-normal text-[16px] text-black leading-[20px] hover:cursor-pointer"
          onClick={() => setOpenRenameModal(true)}
        >
          Rename
        </span>
        <span
          className="leading-[20px] mt-[13px] font-bold text-[16px] text-[#FC2828] hover:cursor-pointer"
          onClick={() => setOpenDeleteModal(true)}
        >
          Delete Category
        </span>
      </div>
    </>
  );
};

export default MenuPopup;
