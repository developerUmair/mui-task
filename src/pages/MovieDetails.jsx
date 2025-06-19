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
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getCastDetails,
  getMovieDetails,
  getRecommendations,
  getSimilar,
} from "../services";
import { Background, formatDate, formatRuntime } from "../utils/helpers";
import TrailerModal from "../components/TrailerModal";
import { AuthContext } from "../context/AuthContext";
import CastCard from "../components/CastCard";
import Slider from "react-slick";
import SectionTitle from "../components/SectionTitle";
import Loader from "../components/Loader";
import MoviesSlider from "../components/MoviesSlider";

var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MovieDetails = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.includes("/tv/") ? "tv" : "movie";

  const [movie, setMovie] = useState({});
  const [castDetails, setCastDetails] = useState([]);
  const [crewDetails, setCrewDetails] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const directors = castDetails?.filter((person) =>
    person?.known_for_department?.includes("Directing")
  );
  const writers = crewDetails?.filter((person) =>
    person?.known_for_department?.includes("Writing")
  );

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const [
          movieDetailsData,
          castDetailsData,
          getSimilarMovies,
          getRecommendedMovies,
        ] = await Promise.allSettled([
          getMovieDetails({ id, category: mediaType }),
          getCastDetails({ id, mediaType }),
          getSimilar({ id, mediaType }),
          getRecommendations({ id, mediaType }),
        ]);

        setMovie(movieDetailsData?.value);
        setCastDetails(castDetailsData?.value?.cast);
        setCrewDetails(castDetailsData?.value?.crew);
        setSimilarMovies(getSimilarMovies?.value?.results);
        setRecommendations(getRecommendedMovies?.value?.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
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
              <Grid item size={{ xs: 12, md: 5, lg: 4 }}>
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

              <Grid item size={{ xs: 12, md: 7, lg: 8 }}>
                <Typography variant="h4" fontWeight="bold">
                  {movie?.title || movie?.name}
                </Typography>

                <Typography variant="subtitle1" fontStyle="italic" color="gray">
                  {movie?.tagline}
                </Typography>
                <Stack
                  direction={{ sx: "column", md: "row" }}
                  spacing={1}
                  my={2}
                >
                  {movie?.genres?.length > 0 &&
                    movie?.genres.map((genre) => (
                      <Chip
                        key={genre?.name}
                        label={genre?.name}
                        size="small"
                        color="secondary"
                        sx={{ mb: 1 }}
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
                    onClick={handleModalOpen}
                  >
                    Watch Trailer
                  </Button>
                </Stack>
                <TrailerModal
                  onClose={handleModalClose}
                  open={openModal}
                  id={id}
                  mediaType={mediaType}
                />

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

                  {movie?.release_date && (
                    <Typography>
                      <strong>Release Date:</strong>{" "}
                      {formatDate(movie?.release_date) || "N/A"}
                    </Typography>
                  )}
                  {movie?.runtime && (
                    <Typography>
                      <strong>Runtime:</strong>{" "}
                      {formatRuntime(movie?.runtime) || "N/A"}
                    </Typography>
                  )}
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
                {writers?.length > 0 && (
                  <>
                    <Divider sx={{ borderColor: "#555", my: 2 }} />
                    <Typography mt={2}>
                      <strong>Writer:</strong>{" "}
                      {writers?.length > 0
                        ? [
                            ...new Set(writers.map((writer) => writer?.name)),
                          ].join(", ")
                        : "N/A"}
                    </Typography>
                  </>
                )}
                {movie?.created_by?.length > 0 && (
                  <>
                    <Divider sx={{ borderColor: "#555", my: 2 }} />
                    <Typography mt={2}>
                      <strong>Created:</strong>{" "}
                      {movie?.created_by?.length > 0
                        ? [
                            ...new Set(
                              movie?.created_by?.map((creator) => creator?.name)
                            ),
                          ].join(", ")
                        : "N/A"}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Background>
        <Box
          maxWidth="xl"
          disableGutters
          sx={{
            pt: 6,
            borderRadius: 2,
            maxWidth: "90%",
            mx: "auto",
          }}
        >
          <SectionTitle title="Top Cast" />
          <Slider {...settings}>
            {castDetails?.length > 0
              ? castDetails.map((cast) => (
                  <CastCard key={cast?.id} cast={cast} />
                ))
              : null}
          </Slider>
        </Box>
        <Box
          maxWidth="xl"
          disableGutters
          sx={{
            pt: 6,
            borderRadius: 2,
            maxWidth: "100%",
            mx: "auto",
          }}
        >
          <SectionTitle
            title={`Similar ${mediaType === "tv" ? "TV Shows" : "Movies"}`}
          />
          {loading ? <Loader /> : <MoviesSlider data={similarMovies} />}
        </Box>
        <Box
          maxWidth="xl"
          disableGutters
          sx={{
            pt: 6,
            borderRadius: 2,
            maxWidth: "100%",
            mx: "auto",
          }}
        >
          <SectionTitle title="Recommendations" />
          {loading ? <Loader /> : <MoviesSlider data={recommendations} />}
        </Box>
      </Background>
    </>
  );
};

export default MovieDetails;
