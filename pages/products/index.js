import ProductListFooter from "../../components/ProductList/ProductListFooter";
import ProductCardsGrid from "../../components/ProductList/ProductCardsGrid";
import ProductListHeader from "../../components/ProductList/ProductListHeader";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

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

  const category = context.query.category || "All";
  const search = context.query.search || "";

  return {
    props: {
      products: productList,
      categories: categoryList,
      category: category,
      search: search,
    },
  };
}

export default function ProductList({
  products,
  categories,
  category,
  search,
}) {
  const [productList, setProductList] = useState(products);
  const [filter, setFilter] = useState(category);

  useEffect(() => {
    handleFilter(category);
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

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
  };

  const handleSearch = (value) => {
    const filteredList = products.filter((product) => {
      return product.name.toLowerCase().match(value.toLowerCase());
    });
    setProductList(filteredList);
  };

  return (
    <>
      <ProductListHeader
        categories={categories}
        filter={filter}
        handleFilter={handleFilter}
        search={search}
      />
      <ProductCardsGrid productList={productList} />
      <ProductListFooter />
    </>
  );
}
