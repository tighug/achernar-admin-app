import React, {
  useState,
  MouseEvent,
  Children,
  ReactElement,
  ReactNode,
} from "react";
import styled, { keyframes } from "styled-components";

export interface AppRipplesProps {
  children: ReactElement;
  disabled?: boolean;
}

export function AppRipples({ children, disabled = false }: AppRipplesProps) {
  Children.only(children);

  const [ripples, setRipples] = useState<JSX.Element[]>([]);
  const [counter, setCounter] = useState<number>(0);

  const createRipples = (e: MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const ripple = <Ripple top={y} left={x} key={counter} />;
    if (counter > 1000) setCounter(0);
    else setCounter((old) => old + 1);
    setRipples((old) => [...old, ripple]);

    setTimeout(cleanup, 1000, ripple);
  };

  const cleanup = (ripple: JSX.Element) => {
    setRipples((old) => old.filter((r) => r !== ripple));
  };

  const grandchildren: ReactNode = children.props.children;
  const modGrandchildren = (
    <>
      {!disabled && ripples}
      {grandchildren}
    </>
  );
  const modChildren = React.cloneElement(
    children,
    {
      onMouseDown: createRipples,
    },
    modGrandchildren
  );

  return <>{modChildren}</>;
}

const rippleAnim = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0.3;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
`;

interface RippleProps {
  top: number;
  left: number;
}

export const Ripple = styled.span<RippleProps>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  pointer-events: none;
  background: currentColor;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${rippleAnim} 500ms ease-in;
`;
