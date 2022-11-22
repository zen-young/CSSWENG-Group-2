import React from "react";

const EditProductSpecification = ({ title, text }) => {
  return (
    <div className="flex items-center">
      <div className="h-2 w-2 rounded-[50%] bg-black" />
      <span className="font-bold text-[20px] leading-[24px] ml-4">
        {title}: <span className="font-normal">{text}</span>
      </span>
    </div>
  );
};

export default EditProductSpecification;
