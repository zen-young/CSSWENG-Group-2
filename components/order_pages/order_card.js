import { Checkbox, Image, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import Link from "next/link";

export default function OrderCardsGrid({
  checkBoxRefs,
  item,
  index,
  handleSelect,
  handleDelete,
}) {
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

  return (
    <>
      <div className="w-full order p-2 px-6 border-solid border-2 border-current rounded-md flex justify-around">
        <Checkbox
          ref={(element) => {
            checkBoxRefs.current[index] = element;
          }}
          onChange={(e) => {
            handleSelect(e, index);
          }}
          className="font-bold my-auto pr-2"
          color="gray"
          size="md"
        />

        <div className="w-[100px] h-[100px] relative">
          <Link href={`/products/${item.product_id}`}>
            <a>
              <Image
                src={item.image_url}
                width={100}
                height={100}
                alt="product image"
              />
            </a>
          </Link>
        </div>

        <div className="my-auto w-2/5 px-2 mr-4">
          <Link href={`/products/${item.product_id}`}>
            <a>
              <Text className="font-bold text-3xl">{item.name}</Text>
            </a>
          </Link>
          <Text className="text-lg">{item.category}</Text>
          <Text className="text-lg">{label}</Text>
        </div>

        <div className="text-2xl font-bold h-full pr-5 border-r border-gray-400 flex items-center">
          {item.price === "PENDING" ? "N/A" : `₱${item.price}`}
        </div>

        <div className="flex items-center ml-2 w-fit">
          {/* <button
            className="py-1 font-bold rounded-md h-6 text-lg pr-3
                                hover:underline hover:transition duration-300 flex items-center"
            id="edit-item"
          >
            <IconPencil />
            <span className="pt-0.5">&nbsp;Edit</span>
          </button> */}

          <button
            className="text-red-600 py-1 font-bold rounded-md h-6 text-lg
                                hover:underline hover:transition duration-300 flex items-center"
            id={`delete-item-${index}`}
            onClick={handleDelete}
          >
            <IconTrash />
            <span className="pt-0.5">&nbsp;Delete</span>
          </button>
        </div>
      </div>
    </>
  );
}
