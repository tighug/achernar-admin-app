import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeederNum, setNetworkNum } from "../../store/cases";
import AppFormControl from "../atoms/AppFormControl";

export default function SelectFeeder() {
  const feeders = useSelector((state) => state.feeders);
  const cases = useSelector((state) => state.cases);
  const dispatch = useDispatch();

  const networkMenus = () => {
    const networkNums = [...new Set(feeders.map((f) => f.networkNum))];
    return networkNums.map((n) => (
      <MenuItem value={n} key={n}>
        {n}
      </MenuItem>
    ));
  };
  const feederMenus = feeders
    .filter((f) => f.networkNum === cases.networkNum)
    .map((f) => f.feederNum)
    .map((n) => (
      <MenuItem value={n} key={n}>
        {n}
      </MenuItem>
    ));

  return (
    <>
      <AppFormControl>
        <InputLabel id="select-network">Network Num</InputLabel>
        <Select
          labelId="select-network"
          value={cases.networkNum}
          onChange={(e) => dispatch(setNetworkNum(e.target.value as number))}
        >
          {networkMenus()}
        </Select>
      </AppFormControl>
      <AppFormControl>
        <InputLabel id="select-feeder">Feeder Num</InputLabel>
        <Select
          labelId="select-feeder"
          value={cases.feederNum}
          onChange={(e) => dispatch(setFeederNum(e.target.value as number))}
        >
          {feederMenus}
        </Select>
      </AppFormControl>
    </>
  );
}
