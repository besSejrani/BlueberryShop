import React from "react";

// Material-UI
import { Box, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Data
import countries from "./countries.json";

// ========================================================================================================

const DropDown = ({ id, name, value, onChange }) => {
  const classes = useStyles();

  return (
    <Select
      className={classes.root}
      labelId={id}
      id={id}
      value={value}
      onChange={(text) => onChange(text.target.value)}
      name={name}
      MenuProps={{ style: { height: 495 } }}
      displayEmpty
      renderValue={(selected) => {
        if (selected?.length === 0) {
          return <em>Select Country</em>;
        }

        return value;
      }}
    >
      {countries.map((country) => (
        <MenuItem value={country.Name}>{country.Name}</MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 20,
    },
  }),
);
