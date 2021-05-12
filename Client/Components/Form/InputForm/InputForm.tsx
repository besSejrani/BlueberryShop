import React, { useImperativeHandle } from "react";

// React-Hook-Form
import { ErrorMessage } from "@hookform/error-message";

// Material-UI
import { TextField, Typography } from "@material-ui/core";

// =================================================================================================

type inputType = {
  type: string;
  name: string;
  id: string;
  label: string;
  multiline?: boolean;
  rowsMax?: string;
  variant?: "standard" | "filled" | "outlined";
  inputRef?: any;
  value: string | number;
  onChange: Function;
  errors?: any;
  disabled?: boolean;
};

const inputForm: React.FC<inputType> = React.forwardRef(
  ({ type, name, id, label, multiline, rowsMax, variant, inputRef, value, onChange, errors, disabled }) => {
    useImperativeHandle(inputRef, () => {
      return {};
    });

    return (
      <>
        <TextField
          style={{ margin: "5px 0px" }}
          type={type}
          name={name}
          id={id}
          label={label}
          multiline={multiline}
          variant={variant}
          rowsMax={rowsMax}
          inputRef={inputRef}
          disabled={disabled}
          ref={inputRef}
          value={value}
          onChange={(text) => onChange(text.target.value)}
        />

        {errors ? (
          <ErrorMessage errors={errors} name={name} as={<Typography variant="body2" />}>
            {({ messages }) =>
              messages && Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
            }
          </ErrorMessage>
        ) : (
          ""
        )}
      </>
    );
  },
);

export default inputForm;
