import {
    Divider,
    Anchor,
    SimpleGrid,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";

export default function OrderDetails({orderList, hasEditCart}) {

    {/* TODO: Map orderList to orders */}
    {/* const orders = orderList.map((order) => ()); */}
    const orders = [];

    orders.push (
        <div className="text-md flex justify-between">
              <span className="pl-2">[Product Name], [Paper Type], [Size], [Qty]</span>
              <span className="pr-2">₱[Price]</span>
        </div>
    );

    orders.push (
        <div className="text-md flex justify-between">
              <span className="pl-2">[Product Name], [Paper Type], [Size], [Qty]</span>
              <span className="pr-2">PENDING</span>
        </div>
    );

    return (
      <>
        <div className="w-full order p-3 px-6 border-solid border-2 border-gray-600 rounded-md bg-gray-100"> 
          
          <div className="flex justify-between w-full items-center">
            <span className="font-bold text-2xl">Order Details</span>
            {hasEditCart && 
              <Anchor href="/cart">
                  <button className="py-1 font-bold rounded-md h-6 my-auto text-xl text-gray-800
                                  hover:underline flex items-center"
                  >
                  <IconShoppingCart /><span className="pt-0.5">&nbsp;Edit Cart</span>
                  </button>
              </Anchor>
            }
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
              <span className="pr-2">₱[Total Price]</span>
            </div>
          </SimpleGrid>

        </div>
      </>
    );
}