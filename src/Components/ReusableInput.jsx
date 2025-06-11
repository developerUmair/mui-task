import { TextField } from "@mui/material";

const ReusableInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  inputProps = {},
  ...rest
}) => {
  return (
    <TextField
      required
      size="small"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      margin="normal"
      variant="outlined"
      color="white"
      inputProps={inputProps}
      {...rest}
      sx={{
        input: { color: "white" },
        label: { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      }}
    />
  );
};

export default ReusableInput;
