import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import H_Divider from '../homepage/H_Divider';
import { 
  Select,
} from "@mantine/core";

export default function ProductListHeader() {
  const [categories, setCategories] = useState([]);

  async function getCategories(){
    const arr = ["All"]
    const querySnapshot = await getDocs(query(collection(db, "categories")));
    querySnapshot.forEach((doc) => {
        arr.push(doc.id)
    });
    setCategories(arr)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <header className="mt-9 mb-1">
        <div className="px-[120px] flex justify-between">
          <div className="font-bold w-fit">
            <h1>
              <i class="fa fa-list-ul" /> Products List
            </h1>
          </div>

          {/* <div className="my-auto flex">
            <h2 className="mr-[5px] my-auto mt-[6px] min-w-[140px]">Select Category:</h2>
            //TODO: Filter Products Based on Category
            <Select
              defaultValue = "All"
              data = {categories}
              rightSection={<i className="fa fa-caret-down"/>}
              styles={(theme) => ({
                item: {
                  '&[data-selected]': {
                    '&, &:hover': {
                      backgroundColor: theme.colors.gray[4],
                      color: theme.colors.dark[9]
                    },
                  },
        
                  '&[data-hovered]': {},
                },
              })}
            >

            </Select>
          </div> */}

        </div>
        <H_Divider />
      </header>
    </>
  );
}