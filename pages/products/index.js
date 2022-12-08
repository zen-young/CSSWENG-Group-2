import ProductListFooter from "../../components/ProductList/ProductListFooter";
import ProductCardsGrid from "../../components/ProductList/ProductCardsGrid";
import ProductListHeader from "../../components/ProductList/ProductListHeader";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFilter(router.query.category || "All");
    setSearch(router.query.search || "");
  }, [router.query]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  useEffect(() => {
    handleFilter(filter);
  }, [filter]);

  const handleFilter = (value) => {
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
      return product.name.toLowerCase().includes(value.toLowerCase());
    });
    setProductList(filteredList);
  };

  return (
    <>
      <ProductListHeader
        categories={categories}
        filter={filter}
        search={search}
        router={router}
      />
      <ProductCardsGrid productList={productList} />
      <ProductListFooter />
    </>
  );
}
