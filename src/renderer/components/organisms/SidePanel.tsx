import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setNetworkNum, setFeederNum } from "../../store/cases";
import { fetchFeeders } from "../../store/feeders";

export default function SidePanel() {
  const feeders = useSelector((state) => state.feeders);
  const cases = useSelector((state) => state.cases);
  const dispatch = useDispatch();
  const networkMenus = () => {
    const duplicatedNetworkNums = feeders.map((f) => f.networkNum);
    const networkNums = [...new Set(duplicatedNetworkNums)];
    return networkNums.map((n) => (
      <MenuItem value={n} key={n}>
        {n}
      </MenuItem>
    ));
  };
  const feederMenus = () => {
    const matchedFeeders = feeders.filter(
      (f) => f.networkNum === cases.networkNum
    );
    const feederNums = matchedFeeders.map((f) => f.feederNum);
    return feederNums.map((n) => (
      <MenuItem value={n} key={n}>
        {n}
      </MenuItem>
    ));
  };

  useEffect(() => {
    dispatch(fetchFeeders());
  }, []);

  return (
    <Wrapper>
      <InputLabel id="select-network">Network Num</InputLabel>
      <StyledSelect
        labelId="select-network"
        variant="outlined"
        value={cases.networkNum}
        onChange={(e) => dispatch(setNetworkNum(e.target.value as number))}
      >
        {networkMenus()}
      </StyledSelect>
      <InputLabel id="select-feeder">Feeder Num</InputLabel>
      <StyledSelect
        labelId="select-feeder"
        variant="outlined"
        value={cases.feederNum}
        onChange={(e) => dispatch(setFeederNum(e.target.value as number))}
      >
        {feederMenus()}
      </StyledSelect>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;
