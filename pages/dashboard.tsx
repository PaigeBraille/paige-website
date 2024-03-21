import React from "react";
import { Wrapper } from "../components/Wrapper";
import ProgressMenu from "../components/ProgressMenu";
import SectionsProgress from "../components/SectionsProgress";

export default function Dashboard() {
  return (
    <Wrapper>
      <ProgressMenu />
      <SectionsProgress />
    </Wrapper>
  );
}
