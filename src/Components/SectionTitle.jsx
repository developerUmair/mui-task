import { Box, Typography } from "@mui/material";


const SectionTitle = ({ title, emoji = "🎬" }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    mb={5}
    position="relative"
    sx={{
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <Typography
      variant="h3"
      fontWeight="900"
      textTransform="uppercase"
      letterSpacing={3}
      sx={{
        fontFamily: '"Bebas Neue", sans-serif',
        color: "#F5C518", // IMDb-style yellow
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <span>{emoji}</span>
      {title}
    </Typography>
  </Box>
);

export default SectionTitle;
