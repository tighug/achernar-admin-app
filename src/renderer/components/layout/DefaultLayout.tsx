import { AppBar, Toolbar } from "@material-ui/core";
import React, { ReactNode } from "react";
import styled from "styled-components";

type DefaultLayoutProps = {
  selects?: ReactNode;
  main?: ReactNode;
};

export default function DefaultLayout({ selects, main }: DefaultLayoutProps) {
  return (
    <Wrapper>
      <StyledBar position="static">
        <Toolbar>
          <Selects>{selects}</Selects>
        </Toolbar>
      </StyledBar>
      {main}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.background.default};
`;

const StyledBar = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: 1rem;
`;

const Selects = styled.div`
  flex-grow: 1;
`;
