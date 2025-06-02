"use client"




import {
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
    Checkbox,
    Input,
  } from "@material-tailwind/react";





export default function DropDownNavBar () {



    const handleNavigation = (url) => {
        window.location.href = url;
      };

  return (
    <div className=" mx-3">


      <Menu
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <Button>Guilds</Button>
        </MenuHandler>
        <MenuList>

          <MenuList className="max-h-72">
              <MenuItem onClick={()=>handleNavigation("https://www.guildbank.biz")}>GuildBank</MenuItem>
              <MenuItem onClick={()=>handleNavigation("https://www.vanilla-plus.com")}>Vanilla-Plus</MenuItem>
          </MenuList>
        </MenuList>
      </Menu>

    </div>
  );
}
