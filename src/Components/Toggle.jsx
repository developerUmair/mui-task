import { Box, Button } from "@mui/material";

const Toggle = ({ options = [], active = "", onChange }) => {
  
  const handleToggle = (option) => {
    if (onChange) onChange(option);
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
          key={option.value}
          onClick={() => handleToggle(option)}
          sx={{
            color: active === option.value ? "#fff" : "#000",
            backgroundColor:
              active === option.value ? "#203a43" : "transparent",
            borderRadius: "30px",
            textTransform: "none",
            px: 3,
            py: 0.5,
            minWidth: 70,
            boxShadow: "none",
          }}
        >
          {option.title}
        </Button>
      ))}
    </Box>
  );
};

export default Toggle;
