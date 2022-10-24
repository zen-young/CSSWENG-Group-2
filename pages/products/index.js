import ProductListFooter from "../../components/ProductList/ProductListFooter";
import ProductCardsGrid from "../../components/ProductList/ProductCardsGrid";
import ProductListHeader from "../../components/ProductList/ProductListHeader";

// TODO: This data should be fetched from an api
const products = [
  {
    title: "Notepads",
    image: "/assets/image 22.png",
  },
  {
    title: "Stickers and Labels",
    image: "/assets/newImage.png",
  },
  {
    title: "Product 1",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  },
  {
    title: "Product 2",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  },
  {
    title: "Product 3",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  },
  {
    title: "Product 4",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  },
  {
    title: "Product 5",
    image: "https://cataas.com/cat/says/hello%20world",
  },
  {
    title: "Product 6",
    image: "https://cataas.com/cat/says/upscale%20solutions%20da%20best!",
  },
  {
    title: "Product 7",
    image: "https://cataas.com/cat/says/CSSWENG%20Group%202%20da%20best!",
  },
];

export default function ProductList() {
  return (
    <>
      <ProductListHeader />
      <ProductCardsGrid productList={products} />
      <ProductListFooter />
    </>
  );
}
