import React, { ReactNode } from "react";
import styled from "styled-components";
import { AppIcon } from "../../atom/AppIcon";

export type DialogItemProps = {
  children: ReactNode;
  icon?: string;
};
export function DialogItem({ children, icon }: DialogItemProps) {
  const renderIcon = icon && <StyledIcon>{icon}</StyledIcon>;

  return (
    <Wrapper>
      {renderIcon}
      <Item>{children}</Item>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 1rem 0;
`;

const StyledIcon = styled(AppIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-right: 20px;
`;

const Item = styled.div`
  flex-grow: 1;
`;
