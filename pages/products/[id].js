import React from "react";
import ImageSection from "../../components/ImageSection/ImageSection";
import LabelSection from "../../components/LabelSection/LabelSection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import { Store } from "react-notifications-component";

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
  const dispatch = useDispatch();

  const handleAddToCart = (object) => {
    dispatch(addToCart(object));
    Store.addNotification({
      title: "Item added to cart!",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
      },
    });
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row w-full">
      <div className="basis-1/2 p-8">
        <ImageSection
          images={product.image_urls.map((url) => {
            return { src: url };
          })}
          content={product.description}
          sizes={product.product_sizes}
          paper={product.paper_types}
          paperContent={product.paper_types.join(", ")}
          packaging={product.packaging}
        />
      </div>
      <div className="basis-1/2 p-8">
        <LabelSection product={product} addToCart={handleAddToCart} />
      </div>
    </div>
  );
}
