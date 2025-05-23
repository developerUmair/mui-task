import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  Tooltip,
  Rating,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const MovieCard = ({ movie }) => {
  const handleWatch = () => alert(`Playing trailer for ${movie.title}...`);
  const handleAdd = () => alert(`${movie.title} added to watchlist!`);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 2,
        perspective: 1000,
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 4,
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          },
          cursor: "pointer",
          bgcolor: "background.paper",
        }}
        elevation={8}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: 220,
          }}
        >
          <CardMedia
            component="img"
            height="350"
            image={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.original_title}
            sx={{
              objectFit: "cover",
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              position: "absolute",
              bottom: 48, 
              left: 16,
              color: "common.white",
              fontWeight: "700",
              textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
            }}
          >
            {movie?.original_title}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="movie-rating"
              value={movie?.vote_average ? movie.vote_average / 2 : 0}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: "yellow" }}
            />

            <Typography
              variant="body2"
              sx={{ color: "common.white", ml: 1, fontWeight: 600 }}
            >
              {(movie?.vote_average/2)?.toFixed(1) ?? "N/A"}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ pt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: 60, fontSize: 14, lineHeight: 1.4 }}
          >
            {movie?.overview ? movie?.overview?.slice(0, 90) + "..." : "No overview available."}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "space-between",
            px: 2,
            pb: 2,
          }}
        >
          <Tooltip title="Watch Trailer">
            <Button
              size="medium"
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleWatch}
              sx={{ fontWeight: 600, borderRadius: 2 }}
            >
              Watch Trailer
            </Button>
          </Tooltip>

          <Tooltip title="Add to Watchlist">
            <IconButton
              color="secondary"
              onClick={handleAdd}
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "secondary.main",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  bgcolor: "secondary.light",
                },
              }}
            >
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MovieCard;
