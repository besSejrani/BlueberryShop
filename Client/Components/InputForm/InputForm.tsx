// React-Hook-Form
import { ErrorMessage } from "@hookform/error-message";

// Material-UI
import { TextField, Typography } from "@material-ui/core";

// ========================================================================================================

type inputType = {
  type: string;
  name: string;
  id: string;
  label: string;
  multiline?: boolean;
  rowsMax?: string;
  inputRef: any;
  value: string | number;
  onChange: Function;
  errors: any;
};

const inputForm: React.FC<inputType> = ({
  type,
  name,
  id,
  label,
  multiline,
  rowsMax,
  inputRef,
  value,
  onChange,
  errors,
}) => {

  console.log(value)

  return (
    <>
      <TextField
        style={{ margin: "5px 0px" }}
        type={type}
        name={name}
        id={id}
        label={label}
        multiline={multiline}
        rowsMax={rowsMax}
        inputRef={inputRef}
        value={value}
        onChange={(text) => onChange(text.target.value)}
      />
      <ErrorMessage errors={errors} name={name} as={<Typography variant="body2" />}>
        {({ messages }) => messages && Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)}
      </ErrorMessage>
    </>
  );
};

export default inputForm;
