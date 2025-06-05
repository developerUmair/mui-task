import { TextField } from "@mui/material";

const ReusableInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  ...rest
}) => {
  return (
    <TextField
      size="small"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      margin="normal"
      variant="outlined"
      {...rest}
    />
  );
};

export default ReusableInput;
