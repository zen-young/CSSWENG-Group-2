import { Divider, Anchor, SimpleGrid } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OrderDetails({ cart }) {
  const router = useRouter();

  const orders = cart.map((item) => {
    let label = "";
    if (item.size) {
      label += `${item.size}, `;
    }
    if (item.color) {
      label += `${item.color}, `;
    }
    if (item.paper_type) {
      label += `${item.paper_type}, `;
    }
    if (item.quantity) {
      label += `${item.quantity} pcs.`;
    }

    return item.price !== "PENDING" ? (
      <div className="text-md flex justify-between">
        <span className="pl-2">
          {item.name}, {label}
        </span>
        <span className="pr-2">₱{item.price}</span>
      </div>
    ) : (
      <div className="text-md flex justify-between">
        <span className="pl-2">
          {item.name}, {label}
        </span>
        <span className="pr-2">PENDING</span>
      </div>
    );
  });

  return (
    <>
      <div className="w-full order p-3 px-6 border-solid border-2 border-gray-600 rounded-md bg-gray-100">
        <div className="flex justify-between w-full items-center">
          <span className="font-bold text-2xl">Order Details</span>
          {router.pathname === "/cart/checkout" ? (
            <>
              <Link href="/cart">
                <Anchor>
                  <button
                    className="py-1 font-bold rounded-md h-6 my-auto text-xl text-gray-800
                                  hover:underline flex items-center"
                  >
                    <IconShoppingCart />
                    <span className="pt-0.5">&nbsp;Edit Cart</span>
                  </button>
                </Anchor>
              </Link>
            </>
          ) : null}
        </div>

        <div className="mt-[20px] text-xl flex justify-between uppercase px-2">
          <span>Product</span>
          <span>Price</span>
        </div>
        <Divider size="sm" color="black" />

        <SimpleGrid cols={1} pt="lg">
          {orders}
          <div className="mt-[10px] text-xl flex justify-between font-bold">
            <span className="pl-2">Subtotal (w/o quotations):</span>
            <span className="pr-2">
              ₱
              {cart
                .filter((item) => item.price !== "PENDING")
                .reduce(
                  (accumulator, item) => accumulator + Number(item.price),
                  0
                )}
            </span>
          </div>
        </SimpleGrid>
      </div>
    </>
  );
}
