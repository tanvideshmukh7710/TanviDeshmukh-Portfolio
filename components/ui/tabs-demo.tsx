import React, { useState } from "react";
import { ITab, Tabs } from "@/components/ui/tabs";

const defaultTabs: ITab[] = [
  {
    title: "Home",
    value: "home"
  },
  {
    title: "About",
    value: "about"
  },
  {
    title: "Contact",
    value: "contact"
  }
];

export const TabsDemo = () => {
  const [selected, setSelected] = useState<string>("home");

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Tabs selected={selected} setSelected={setSelected} tabs={defaultTabs} />
    </div>
  );
};
