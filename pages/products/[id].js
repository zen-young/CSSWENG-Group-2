import React, { useState } from "react";
import ImageSection from "../../components/ImageSection/ImageSection";
import LabelSection from "../../components/LabelSection/LabelSection";

export default function Product() {
  const [content, setContent] = useState("Personalized Stickers with Diecut");
  const [sizes, setSizes] = useState(["2.4x1.25", "2.4x2", "3.5x2"]);
  const [paperContent, setPaperContent] = useState(
    "Glossy or matte waterproof and scratch proof vinyl stickers"
  );
  const [quantites, setQuantities] = useState([
    "10",
    "20",
    "50",
    "100",
    "500",
    "1000",
  ]);
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full">
      <div className="basis-1/2 p-8">
        <ImageSection
          content={content}
          sizes={sizes}
          paperContent={paperContent}
        />
      </div>
      <div className="basis-1/2 p-8">
        <LabelSection sizes={sizes} quantities={quantites} />
      </div>
    </div>
  );
}
