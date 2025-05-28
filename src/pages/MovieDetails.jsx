import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCastDetails, getMovieDetails } from "../services";
import { formatDate, formatRuntime } from "../utils";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [castDetails, setCastDetails] = useState([]);
  const [crewDetails, setCrewDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const directors = castDetails?.filter((person) =>
    person?.known_for_department?.includes("Directing")
  );
  const writers = crewDetails?.filter((person) =>
    person?.known_for_department?.includes("Writing")
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [movieDetailsData, castDetailsData] = await Promise.allSettled([
          getMovieDetails(id),
          getCastDetails(id),
        ]);

        setMovie(movieDetailsData?.value);
        setCastDetails(castDetailsData?.value?.cast);
        setCrewDetails(castDetailsData?.value?.crew);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(44, 83, 100, 0.7) 0%,
            rgba(32, 58, 67, 0.6) 50%,
            rgba(15, 32, 39, 0.8) 100%
          ),
          url('https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#fff", fontSize: "4rem" }} />
        </Box>
      ) : (
        <Box
          sx={{
            color: "#fff",
            p: { xs: 2, md: 2 },
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5} lg={4}>
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt="Movie Poster"
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  borderRadius: 2,
                  boxShadow: 3,
                  mx: { xs: "auto", md: 0 },
                  display: "block",
                }}
              />
            </Grid>

            <Grid item xs={12} md={7} lg={8}>
              <Typography variant="h4" fontWeight="bold">
                {movie?.title}
              </Typography>

              <Typography variant="subtitle1" fontStyle="italic" color="gray">
                {movie?.tagline}
              </Typography>

              <Stack direction="row" spacing={1} my={2}>
                {movie?.genres?.length > 0 &&
                  movie?.genres.map((genre) => (
                    <Chip
                      key={genre?.name}
                      label={genre?.name}
                      size="small"
                      color="secondary"
                    />
                  ))}
              </Stack>

              <Stack direction="row" spacing={3} alignItems="center" my={2}>
                <StarBorderRoundedIcon fontSize="large" />
                <Typography variant="h6">{movie?.vote_average}</Typography>
                <Button
                  startIcon={<PlayCircleOutlineOutlinedIcon />}
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#fff" }}
                >
                  Watch Trailer
                </Button>
              </Stack>

              <Box my={3}>
                <Typography variant="h6" fontWeight="bold">
                  Overview
                </Typography>
                <Typography variant="body1" color="grey.300" maxWidth={800}>
                  {movie?.overview}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "#555", my: 2 }} />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Typography>
                  <strong>Status:</strong> {movie?.status || "N/A"}
                </Typography>

                <Typography>
                  <strong>Release Date:</strong>{" "}
                  {formatDate(movie?.release_date) || "N/A"}
                </Typography>
                <Typography>
                  <strong>Runtime:</strong>{" "}
                  {formatRuntime(movie?.runtime) || "N/A"}
                </Typography>
              </Stack>

              {directors?.length > 0 && (
                <>
                  {" "}
                  <Divider sx={{ borderColor: "#555", my: 2 }} />
                  <Typography mt={2}>
                    <strong>Director:</strong>{" "}
                    {directors?.length > 0
                      ? [
                          ...new Set(
                            directors.map((director) => director?.name)
                          ),
                        ].join(", ")
                      : "N/A"}
                  </Typography>{" "}
                </>
              )}
              <Divider sx={{ borderColor: "#555", my: 2 }} />
              <Typography mt={2}>
                <strong>Writer:</strong>{" "}
                {writers?.length > 0
                  ? [...new Set(writers.map((writer) => writer?.name))].join(
                      ", "
                    )
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;
