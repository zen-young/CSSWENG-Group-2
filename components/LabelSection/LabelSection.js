import React, { useEffect, useState } from "react";
import { Input, Select } from "@mantine/core";

const LabelSection = ({ product, addToCart }) => {
  const [variation, setVariation] = useState(-2);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [paper, setPaper] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [variationsData, setVariationsData] = useState([]);

  useEffect(() => {
    const variationList = product.variations.map((variation, index) => {
      let label = "";
      if (variation.size) {
        label += `${variation.size}, `;
      }
      if (variation.color) {
        label += `${variation.color}, `;
      }
      if (variation.paper_type) {
        label += `${variation.paper_type}, `;
      }
      if (variation.quantity) {
        label += `${variation.quantity} pcs.`;
      }

      return {
        value: index,
        label: label,
      };
    });
    variationList.push({ value: -1, label: "Custom" });
    setVariationsData(variationList);
  }, [product.variations]);

  return (
    <div className="flex flex-col">
      <span className="text-[32px] font-bold">{product.name}</span>
      <div className="border-b-[1px] border-b-black opacity-30 w-full mt-4" />

      <div className="mt-4 ml-2">
        <div className="text-[20px] font-bold">Variation</div>
        <Select
          className="mt-2"
          placeholder="Select Variation"
          data={variationsData}
          onChange={(val) => setVariation(val)}
        />

        {variation === -1 ? (
          <>
            <div className="text-[20px] font-bold mt-4">Size</div>
            <Select
              className="mt-2"
              placeholder="Select Size"
              data={product.product_sizes}
              onChange={(val) => setSize(val)}
              onSearchChange={(val) => setSize(val)}
              searchable
              clearable
            />

            <div className="text-[20px] font-bold mt-4">Color</div>
            <Select
              className="mt-2"
              placeholder="Select Color"
              data={product.paper_colors}
              onChange={(val) => setColor(val)}
              clearable
            />

            <div className="text-[20px] font-bold mt-4">Paper</div>
            <Select
              className="mt-2"
              placeholder="Select Paper"
              data={product.paper_types}
              onChange={(val) => setPaper(val)}
              clearable
            />

            <div className="text-[20px] font-bold mt-4">Quantity</div>
            <Input
              className="mt-2"
              placeholder="Enter Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </>
        ) : null}
      </div>

      <div className="mt-[33px]">
        {variation === -1 ? (
          <span className="italic text-[#FF0000] text-[20px]">
            Note: Custom Orders Need to Wait for a Quotation
          </span>
        ) : null}

        <div className=" flex items-center space-x-4">
          <span className="text-[32px] font-normal">Total: </span>
          <span className="text-[32px] font-bold">
            {variation < 0
              ? "PENDING"
              : `₱${product.variations[variation].price}`}
          </span>
        </div>
      </div>

      <div className="flex mt-[31px] items-center justify-center w-full">
        <button
          onClick={addToCart}
          className="bg-black text-white px-12 py-3 text-[24px] w- font-bold uppercase rounded-md
                          hover:bg-gray-600 hover:shadow-lg hover:transition duration-300"
        >
          ADD TO CART
        </button>
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-[27px]">
        <span className="text-[20px] font-normal">
          Need a special order? Contact us on Viber
        </span>
        <span className="text-[20px]">
          at <strong>+63917-510-1023</strong>
        </span>
      </div>
    </div>
  );
};

export default LabelSection;
