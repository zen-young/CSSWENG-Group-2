import React, { useEffect, useRef } from "react";

const DeleteModal = ({ closeModal, name, handleClick, description }) => {
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

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-10">
      <div
        ref={ref}
        className="bg-white flex flex-col items-start mt-48 ml-48 px-[22px] py-[20px] w-[500px] rounded"
      >
        <span className="text-[24px] font-bold text-black">Delete {name}</span>

        <div className="w-full border-b-black border-b" />

        <span className="text-[16px] font-normal text-justify mt-[14px] mb-[18px]">
          <span className="font-bold">Warning:&nbsp;</span>
          {description}
        </span>

        <div className="flex items-center justify-end w-full space-x-3">
          <button
            className="w-[99px] text-center rounded-md py-[3px] text-black font-normal text-[16px] bg-[#a8a8a8]"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="w-[99px] text-center rounded-md py-[3px] text-white font-bold text-[16px] bg-[#fc2829]"
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
