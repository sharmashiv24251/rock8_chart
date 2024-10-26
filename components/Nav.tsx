import React from "react";
import { Card } from "./ui/card";
import { SidebarTrigger } from "./ui/sidebar";

const Nav = () => {
  return (
    <nav className="h-[4.3rem] w-full">
      <Card className="h-full rounded-none bg-sidebar flex items-center">
        <SidebarTrigger />

        <h1 className="font-semibold text-2xl ml-5">Chart app</h1>
      </Card>
    </nav>
  );
};

export default Nav;
