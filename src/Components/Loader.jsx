import { Box, Skeleton } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, flexWrap: "wrap" }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 4 }}
        width={210}
        height={318}
      />
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 4 }}
        width={210}
        height={318}
      />
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 4 }}
        width={210}
        height={318}
      />
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 4 }}
        width={210}
        height={318}
      />
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 4 }}
        width={210}
        height={318}
      />
    </Box>
  );
};

export default Loader;
