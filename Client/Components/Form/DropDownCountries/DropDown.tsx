import React, { useState } from "react";

// Material-UI
import { Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Data
import countries from "./countries.json";

// ========================================================================================================

const DropDown = ({ id, name, value, onChange }) => {
  const classes = useStyles();

  // State
  const [selectCountry, setSelectCountry] = useState("");

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
          return <em style={{ color: "rgb(118,118,118)" }}>Select Country</em>;
        }

        return selectCountry;
      }}
    >
      {countries.map((country) => (
        <MenuItem value={country.Code} name={name} onClick={() => setSelectCountry(country.Name)}>
          {country.Name}
        </MenuItem>
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
