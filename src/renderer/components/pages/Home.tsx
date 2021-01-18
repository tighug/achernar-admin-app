import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import MainPanel from "../organisms/MainPanel";
import SidePanel from "../organisms/SidePanel";

export default function Home(): JSX.Element {
  return <DefaultLayout side={<SidePanel />} main={<MainPanel />} />;
}
