import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const ReusableInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  showToggle = false,
  showPassword = false,
  setShowPassword,
  inputProps = {},
  ...rest
}) => {
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
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
      InputProps={{
        endAdornment: showToggle ? (
          <InputAdornment position="end">
            <IconButton
              onClick={handleShowPassword}
              edge="end"
              size="small"
              sx={{ color: "white" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
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
