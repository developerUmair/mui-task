import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
  Rating,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 3,
        perspective: 1000,
      }}
      onClick={handleRedirect}
    >
      <Card
        sx={{
          width: 300,
          height: 400,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          "&:hover": {
            transform: "scale(1.08)",
            boxShadow: "0 24px 50px rgba(0,0,0,0.5)",
          },
          cursor: "pointer",
          position: "relative",
          bgcolor: "background.default",
        }}
        elevation={10}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.original_title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              "&:hover": {
                transform: "scale(1.07)",
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              px: 2,
              pb: 2,
              pt: 6,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: "common.white",
                fontWeight: 700,
                textShadow: "2px 2px 6px rgba(0,0,0,0.9)",
              }}
            >
              {movie?.original_title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 0.5,
              }}
            >
              <Rating
                name="movie-rating"
                value={movie?.vote_average ? movie.vote_average / 2 : 0}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                  color: "#ffeb3b",
                  filter: "drop-shadow(0 0 4px rgba(255,235,59,0.8))",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "white", ml: 1, fontWeight: 600 }}
              >
                {(movie?.vote_average / 2)?.toFixed(1) ?? "N/A"}
              </Typography>
            </Box>

            <CardActions
              sx={{
                justifyContent: "space-between",
                mt: 2,
                px: 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "grey.300",
                  mt: 0.5,
                  fontWeight: 500,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                }}
              >
                {movie?.release_date &&
                  formatDate(movie?.release_date)}
              </Typography>

              <Tooltip title="Add to Watchlist">
                <IconButton
                  color="secondary"
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "secondary.main",
                    bgcolor: "background.paper",
                    "&:hover": {
                      bgcolor: "secondary.light",
                    },
                  }}
                >
                  <PlaylistAddIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MovieCard;
