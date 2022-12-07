import React, { useState } from "react";
import { useRouter } from "next/router";
import ImageSection from "../../components/ImageSection/ImageSection";
import LabelSection from "../../components/LabelSection/LabelSection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function getServerSideProps(context) {
  const id = context.params.id;
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: productSnap.data() },
  };
}

export default function Product({ product }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full">
      <div className="basis-1/2 p-8">
        <ImageSection
          images={product.image_urls.map((url) => {
            return { src: url };
          })}
          content={product.description}
          sizes={product.product_sizes}
          paperContent={product.paper_types.join(", ")}
          packaging={product.packaging}
        />
      </div>
      <div className="basis-1/2 p-8">
        <LabelSection
          productName={product.name}
          sizes={product.product_sizes}
          quantities={product.variations.map((variation) => {
            return variation.quantity;
          })}
          prices={product.variations.map((variation) => {
            return variation.price;
          })}
        />
      </div>
    </div>
  );
}
