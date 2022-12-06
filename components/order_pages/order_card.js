import {
    SimpleGrid,
    Checkbox,
    Image,
    Text,
  } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
  

// TODO: map orderlist to cards
//   export default function OrderCardsGrid({ orderList }) {
export default function OrderCardsGrid() {
    
    // const cards = orderList.map((order) => ());
    const cards = [];

    cards.push(
        <div className="w-full order p-2 px-6 border-solid border-2 border-current rounded-md flex justify-around">
            <Checkbox
                className="font-bold my-auto pr-2"
                color="gray"
                size="md"
            />

            <div className="w-[100px] h-[100px] relative">
                <Image
                    src= "/assets/about_logo.png"
                    width={100}
                    height={100}
                    alt="product image"
                />
            </div>

            <div className="my-auto w-2/5 px-2">
                <Text className="font-bold text-3xl">
                    [Product Name]
                </Text>
                <Text className="text-lg">
                    [Category Name]
                </Text>
                <Text className="text-lg">
                    [Paper Type] , [Size], [Qty]
                </Text>
            </div>

            
            <div className="text-2xl font-bold h-full pr-5 border-r border-gray-400 flex items-center">
                ₱[Price]
            </div>

            <div className="flex items-center ml-2 w-fit">
                <button className="py-1 font-bold rounded-md h-6 text-lg pr-3
                                hover:underline hover:transition duration-300 flex items-center"
                        id="edit-item"
                >
                    <IconPencil />
                    <span className="pt-0.5">&nbsp;Edit</span>
                </button>

                <button className="text-red-600 py-1 font-bold rounded-md h-6 text-lg
                                hover:underline hover:transition duration-300 flex items-center"
                        id="delete-item"
                >
                    <IconTrash />
                    <span className="pt-0.5">&nbsp;Delete</span>
                </button>
            </div>

        </div>
    )

  
    return (
    <SimpleGrid cols={1} py="xl">
        {cards}
    </SimpleGrid>
    );
}