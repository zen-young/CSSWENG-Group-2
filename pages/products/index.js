import ProductListFooter from "../../components/ProductList/ProductListFooter";
import ProductCardsGrid from "../../components/ProductList/ProductCardsGrid";
import ProductListHeader from "../../components/ProductList/ProductListHeader";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useState } from "react";

export async function getServerSideProps(context) {
  const productList = [];
  const categoryList = ["All"];
  const products = await getDocs(collection(db, "products"));

  products.forEach((doc) => {
    const product = doc.data();
    if (
      product.hasOwnProperty("name") &&
      product.hasOwnProperty("image_urls") &&
      product.hasOwnProperty("product_id") &&
      product.image_urls.length > 0
    ) {
      const product = doc.data();
      productList.push(product);

      if (!categoryList.includes(product.category)) {
        categoryList.push(product.category);
      }
    }
  });

  return {
    props: {
      products: productList,
      categories: categoryList,
    },
  };
}

export default function ProductList({ products, categories }) {
  const [productList, setProductList] = useState(products);
  const [filter, setFilter] = useState("All");

  const handleFilter = (value) => {
    setFilter(value);

    if (value === "All") {
      setProductList(products);
      return;
    }

    const filteredList = products.filter((product) => {
      return value === product.category;
    });
    setProductList(filteredList);
    console.log(value, productList);
  };

  return (
    <>
      <ProductListHeader
        categories={categories}
        filter={filter}
        handleFilter={handleFilter}
      />
      <ProductCardsGrid productList={productList} />
      <ProductListFooter />
    </>
  );
}
