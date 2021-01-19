import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchFeeders } from "../../store/feeders";
import SelectFeeder from "../molecules/SelectFeeder";

export default function SidePanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeders());
  }, []);

  return (
    <Wrapper>
      <SelectFeeder />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 90%;
  margin: auto;
`;
