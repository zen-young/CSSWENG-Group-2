import React from "react";
import H_Divider from "../homepage/H_Divider";
import { Select } from "@mantine/core";

export default function ProductListHeader({
  categories,
  filter,
  search,
  router,
}) {
  return (
    <>
      <header className="mt-9 mb-1">
        <div className="px-[120px] flex justify-between">
          <div className="font-bold w-fit">
            {search === "" ? (
              <h1>
                <i class="fa fa-list-ul" /> Products List
              </h1>
            ) : (
              <h1>
                <i class="fa fa-search" /> {`Search results for "${search}"`}
              </h1>
            )}
          </div>

          <div className="my-auto flex">
            {search === "" ? (
              <>
                <h2 className="mr-[5px] my-auto mt-[6px] min-w-[140px]">
                  Select Category:
                </h2>
                <Select
                  value={filter}
                  onChange={(val) => router.push(`/products?category=${val}`)}
                  data={categories}
                  rightSection={<i className="fa fa-caret-down" />}
                  styles={(theme) => ({
                    item: {
                      "&[data-selected]": {
                        "&, &:hover": {
                          backgroundColor: theme.colors.gray[4],
                          color: theme.colors.dark[9],
                        },
                      },

                      "&[data-hovered]": {},
                    },
                  })}
                ></Select>
              </>
            ) : null}
          </div>
        </div>
        <H_Divider />
      </header>
    </>
  );
}
