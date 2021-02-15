import {
  Divider,
  FormControlLabel,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  Switch,
} from "@material-ui/core";
import {
  blue,
  deepOrange,
  indigo,
  lightGreen,
  red,
  yellow,
} from "@material-ui/core/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGradation,
  toggleLoadVisibility,
  togglePVVisibility,
  toggleLineVisibility,
  toggleViolationVisibility,
  setStrength,
  setMinV,
  setMaxV,
  toggleBuyerVisibility,
  toggleSellerVisibility,
} from "../../store/diagrams";
import { AppIcon } from "../atom/AppIcon";
import { AppPanel } from "../molecule/AppPanel";

export function Filters() {
  const { minV, maxV, gradation, strength, visibility } = useSelector(
    (s) => s.diagrams
  );
  const dispatch = useDispatch();
  return (
    <div style={{ height: "100%" }}>
      <AppPanel height="100%">
        <List subheader={<ListSubheader>Visibility</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <AppIcon color={yellow[500]}>emoji_objects</AppIcon>
            </ListItemIcon>
            <ListItemText primary="Loads" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={visibility.load}
                onChange={() => dispatch(toggleLoadVisibility())}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AppIcon color={lightGreen[500]}>brightness_7</AppIcon>
            </ListItemIcon>
            <ListItemText primary="PVs" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={visibility.pv}
                onChange={() => dispatch(togglePVVisibility())}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AppIcon color={blue[500]}>show_chart</AppIcon>
            </ListItemIcon>
            <ListItemText primary="Lines" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={visibility.line}
                onChange={() => dispatch(toggleLineVisibility())}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AppIcon color={indigo[500]}>face</AppIcon>
            </ListItemIcon>
            <ListItemText primary="Buyers" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={visibility.buyer}
                onChange={() => dispatch(toggleBuyerVisibility())}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AppIcon color={deepOrange[500]}>face</AppIcon>
            </ListItemIcon>
            <ListItemText primary="Sellers" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={visibility.seller}
                onChange={() => dispatch(toggleSellerVisibility())}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AppIcon color={red[500]}>error</AppIcon>
            </ListItemIcon>
            <ListItemText primary="Violation Nodes" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={visibility.violation}
                onChange={() => dispatch(toggleViolationVisibility())}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader>Gradation</ListSubheader>}>
          <ListItem>
            <RadioGroup
              row
              value={gradation}
              onChange={({ target }) =>
                dispatch(setGradation(target.value as "bicolor" | "multicolor"))
              }
            >
              <FormControlLabel
                value="bicolor"
                label="bicolor"
                control={<Radio />}
              />
              <FormControlLabel
                value="multicolor"
                label="multicolor"
                control={<Radio />}
              />
            </RadioGroup>
          </ListItem>
          <ListItem disabled={gradation !== "multicolor"}>
            <ListItemText primary="Range [A]" />
            <ListItemSecondaryAction>
              <Input
                value={strength}
                onChange={({ target }) =>
                  dispatch(setStrength(Number(target.value)))
                }
                inputProps={{
                  step: 5,
                  min: 5,
                  max: 200,
                  type: "number",
                }}
                disabled={gradation !== "multicolor"}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        {/* <List subheader={<ListSubheader>Violation</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Min V [V]" />
          <ListItemSecondaryAction>
            <Input
              value={minV}
              onChange={({ target }) => dispatch(setMinV(Number(target.value)))}
              inputProps={{
                step: 0.1,
                min: 50,
                max: 300,
                type: "number",
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Max V [V]" />
          <ListItemSecondaryAction>
            <Input
              value={maxV}
              onChange={({ target }) => dispatch(setMaxV(Number(target.value)))}
              inputProps={{
                step: 0.1,
                min: 50,
                max: 300,
                type: "number",
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List> */}
      </AppPanel>
    </div>
  );
}
