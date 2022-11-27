import React, { useState } from "react";
import Carousel_comp from "../components/homepage/Carousel_comp";
import Featured_Products from "../components/homepage/Featured_Products";
import About_Us from "../components/homepage/about_us";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function getServerSideProps(context) {
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
  };
}

function Homepage({ products }) {
  const [numberofPages, setNumPages] = useState(3);

  return (
    <>
      <Carousel_comp />
      <Featured_Products products={products} />
      <About_Us />
    </>
  );
}

export default Homepage;
