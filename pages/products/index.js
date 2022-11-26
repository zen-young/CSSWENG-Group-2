import ProductListFooter from "../../components/ProductList/ProductListFooter";
import ProductCardsGrid from "../../components/ProductList/ProductCardsGrid";
import ProductListHeader from "../../components/ProductList/ProductListHeader";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      getDocs(collection(db, "products"))
        .then((res) => {
          const productList = [];
          res.forEach((doc) => {
            productList.push(doc.data());
          });
          setProducts(productList);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log(products);

  return (
    <>
      <ProductListHeader />
      <ProductCardsGrid productList={products} />
      <ProductListFooter />
    </>
  );
}
