import { useState } from "react";
import { Box, Button } from "@mui/material";

const Toggle = ({ options = [], defaultActive = "", onChange }) => {
  const [active, setActive] = useState(defaultActive || options[0]);

  const handleToggle = (value) => {
    setActive(value);
    if (onChange) onChange(value);
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        borderRadius: "30px",
        backgroundColor: "#e0e0e0",
        padding: "3px",
      }}
    >
      {options.map((option) => (
        <Button
          key={option}
          onClick={() => handleToggle(option)}
          sx={{
            color: active === option ? "#fff" : "#000",
            backgroundColor: active === option ? "#1976d2" : "transparent",
            borderRadius: "30px",
            textTransform: "none",
            px: 3,
            py: 0.5,
            minWidth: 70,
            boxShadow: "none",
          }}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </Box>
  );
};

export default Toggle;
