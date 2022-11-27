import ProductListFooter from "../../components/ProductList/ProductListFooter";
import ProductCardsGrid from "../../components/ProductList/ProductCardsGrid";
import ProductListHeader from "../../components/ProductList/ProductListHeader";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export async function getStaticProps(context) {
  const products = await getDocs(collection(db, "products"));
  const productList = [];
  products.forEach((doc) => {
    const product = doc.data();
    if (
      product.hasOwnProperty("name") &&
      product.hasOwnProperty("image_urls") &&
      product.image_urls.length > 0
    ) {
      productList.push(doc.data());
    }
  });

  return {
    props: {
      products: productList,
    },
    revalidate: 10,
  };
}

export default function ProductList({ products }) {
  return (
    <>
      <ProductListHeader />
      <ProductCardsGrid productList={products} />
      <ProductListFooter />
    </>
  );
}
