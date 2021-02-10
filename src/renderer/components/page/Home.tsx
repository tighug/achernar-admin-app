import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Main } from "../organism/Main";
import Selects from "../organism/Selects";

export default function Home(): JSX.Element {
  return <DefaultLayout selects={<Selects />} main={<Main />} />;
}
