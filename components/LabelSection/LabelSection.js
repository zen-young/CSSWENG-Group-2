import React, { useEffect, useState } from "react";
import { Autocomplete, Input, Select } from "@mantine/core";

const LabelSection = ({ product, addToCart }) => {
  const [variation, setVariation] = useState(-2); // -2 = no selection made, -1 = custom variation
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

  const validateInput = () => {
    if (variation == -2) {
      return;
    }

    if (variation >= 0) {
      addToCart({
        product_id: product.product_id,
        name: product.name,
        category: product.category,
        image_url: product.image_urls[0],
        ...product.variations[variation],
      });
    }

    if (variation === -1) {
      console.log(size, color, paper, quantity);
      if (!size) return;
      if (!quantity) return;
      if (!(product.paper_colors && color)) return;
      if (!(product.paper_types && paper)) return;

      addToCart({
        product_id: product.product_id,
        name: product.name,
        category: product.category,
        image_url: product.image_urls[0],
        color: color,
        paper_type: paper,
        price: "PENDING",
        quantity: quantity,
        size: size,
      });
    }
  };

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
            <Autocomplete
              className="mt-2"
              value={size}
              placeholder="Select Size"
              data={product.product_sizes}
              onChange={(val) => setSize(val.substring(0, 32))}
            />

            <div className="text-[20px] font-bold mt-4">Color</div>
            <Autocomplete
              className="mt-2"
              value={color}
              placeholder="Select Color"
              data={product.paper_colors}
              onChange={(val) => setColor(val.substring(0, 32))}
            />

            <div className="text-[20px] font-bold mt-4">Paper</div>
            <Autocomplete
              className="mt-2"
              value={paper}
              placeholder="Select Paper"
              data={product.paper_types}
              onChange={(val) => setPaper(val.substring(0, 32))}
            />

            <div className="text-[20px] font-bold mt-4">Quantity</div>
            <Input
              value={quantity}
              className="mt-2"
              placeholder="Enter Quantity"
              onChange={(e) => {
                const re = /^[0-9\b]+$/;

                if (e.target.value === "" || re.test(e.target.value)) {
                  setQuantity(e.target.value.substring(0, 4));
                }
              }}
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
          onClick={validateInput}
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
