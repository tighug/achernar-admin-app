import React, { ReactNode } from "react";
import SplitPane from "react-split-pane";

type DefaultLayoutProps = {
  side: ReactNode;
  main: ReactNode;
};

export default function DefaultLayout({ side, main }: DefaultLayoutProps) {
  return (
    <SplitPane split="vertical" minSize={200} maxSize={200} defaultSize={200}>
      {side}
      {main}
    </SplitPane>
  );
}
