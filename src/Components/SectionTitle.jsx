import { Box, Container, Typography } from "@mui/material";
import Toggle from "./Toggle";

const SectionTitle = ({ title }) => (
  <Container maxWidth="lg" disableGutters>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      sx={{
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="900"
        textTransform="uppercase"
        letterSpacing={3}
        sx={{
          fontFamily: '"Bebas Neue", sans-serif',
          color: "#F5C518",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {title}
      </Typography>
      <Toggle options={["Daily", "Weekly"]} />
    </Box>
  </Container>
);

export default SectionTitle;
