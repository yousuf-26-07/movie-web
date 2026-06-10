"use client";
import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const menuItems = [
  { title: "Popular", desc: "Top rated by audience" },
  { title: "Trending", desc: "Currently viral picks" },
  { title: "Favourites", desc: "Your saved collection" },
];

export function MoviesDropdown() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="pl-5 flex items-center gap-1 text-base font-medium capitalize tracking-wide text-white hover:text-yellow-400 transition focus:outline-none focus:ring-0"
        >
          Movies{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-4 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-3 bg-gray-900 text-white rounded-xl shadow-xl border border-gray-800 z-[9999] relative focus:outline-none focus:ring-0">
        <ul className="flex flex-col w-48 gap-2">
          {menuItems.map(({ title, desc }) => (
            <MenuItem
              key={title}
              onClick={() => {
                if (title === "Trending") {
                  router.push(`/trending`)}
                else if (title === "Popular") {
                  router.push(`/`)}
                else if (title === "Favourites") {
                  router.push(`/favourites`)}
              }}
              className="flex flex-col items-start rounded-lg hover:bg-gray-800 hover:scale-[1.02] transition-transform duration-150 p-3 cursor-pointer focus:outline-none focus:ring-0"
            >
              <Typography variant="h6" className="text-white font-semibold">
                {title}
              </Typography>
              {desc && (
                <Typography variant="small" className="text-gray-400 text-sm">
                  {desc}
                </Typography>
              )}
            </MenuItem>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
}
