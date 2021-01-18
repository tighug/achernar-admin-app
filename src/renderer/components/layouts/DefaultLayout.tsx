import React, { ReactNode } from "react";
import SplitPane from "react-split-pane";

type DefaultLayoutProps = {
  side: ReactNode;
  main: ReactNode;
};

export default function DefaultLayout({ side, main }: DefaultLayoutProps) {
  return (
    <SplitPane split="vertical" minSize={100} maxSize={400} defaultSize={250}>
      {side}
      {main}
    </SplitPane>
  );
}
