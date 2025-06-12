import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { moviesContext } from "../context/MoviesDataContext";
import { useLocation } from "react-router-dom";
import { getDiscoveredMoviesAndTvShows, getGenras } from "../services";
import MovieCard from "../Components/MovieCard";
import { Background } from "../utils";
import Slider from "@mui/material/Slider";
import Loader from "../Components/Loader";

const Explore = () => {
  const location = useLocation();
  const mediaType = location.pathname.includes("/tv") ? "tv" : "movie";

  const { genras, setGenras } = useContext(moviesContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [discoverdData, setDiscoverdData] = useState([]);
  const [rating, setRating] = useState([0, 10]);
  const [sliderValue, setSliderValue] = useState([0, 10]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const isLoadingRef = useRef(false);
  const lastRequestRef = useRef(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedGenres(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = useCallback((genreId) => {
    setSelectedGenres((chips) => chips.filter((chip) => chip.id !== genreId));
  }, []);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleRatingChangeCommitted = (event, newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
    setSliderValue(rating);
  }, [rating]);

  const genreMenuItems = useMemo(() => {
    return genras?.length > 0
      ? genras.map((genre) => (
          <MenuItem key={genre.id} value={genre}>
            {genre.name}
          </MenuItem>
        ))
      : [];
  }, [genras]);

  const fetchDiscoverdData = useCallback(
    async (pageNum, isNewFilter = false) => {
      if (isLoadingRef.current) return;

      try {
        isLoadingRef.current = true;
        setLoading(true);

        // Cancel previous request if exists
        if (lastRequestRef.current) {
          lastRequestRef.current.abort?.();
        }

        const controller = new AbortController();
        lastRequestRef.current = controller;

        const genreIds = selectedGenres.map((g) => g.id).join(",");
        const response = await getDiscoveredMoviesAndTvShows({
          mediaType,
          page: pageNum,
          genres: genreIds || undefined,
          ratingGt: rating[0],
          ratingLt: rating[1],
        });

        if (isNewFilter) {
          setDiscoverdData(response.results);
        } else {
          setDiscoverdData((prev) => [...prev, ...response.results]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch Error:", error);
        }
      } finally {
        isLoadingRef.current = false;
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [mediaType, selectedGenres, rating]
  );

  useEffect(() => {
    const fetchGenrasList = async () => {
      try {
        setInitialLoading(true);
        const genrasData = await getGenras(mediaType);
        setGenras(genrasData.genres);
      } catch (error) {
        console.error("Genres Fetch Error:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchGenrasList();
  }, [mediaType, setGenras]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchDiscoverdData(1, true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedGenres, mediaType, rating, fetchDiscoverdData]);

  useEffect(() => {
    if (page > 1) {
      fetchDiscoverdData(page, false);
    }
  }, [page, fetchDiscoverdData]);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        if (
          scrollTop + clientHeight >= scrollHeight - 100 &&
          !isLoadingRef.current
        ) {
          setPage((prev) => prev + 1);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Background>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            pt: 4,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            {mediaType === "tv" ? "Discover TV Shows" : "Discover Movies"}
          </Typography>
          <Box>
            <FormControl fullWidth sx={{ width: 320 }} size="small">
              <InputLabel id="genre-select-label" sx={{ color: "#0f2027" }}>
                Select genres
              </InputLabel>
              <Select
                labelId="genre-select-label"
                multiple
                value={selectedGenres}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Select genres"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((genre) => (
                      <Chip
                        key={genre.id}
                        label={genre.name}
                        size="small"
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleDelete(genre.id);
                        }}
                      />
                    ))}
                  </Box>
                )}
                sx={{
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                  "& fieldset": { borderColor: "blue" },
                  borderRadius: 4,
                }}
              >
                {genreMenuItems}
              </Select>
            </FormControl>
            <Box sx={{ width: 320, mt: 3 }}>
              <Typography gutterBottom sx={{ color: "white" }}>
                Filter by Rating ({sliderValue[0]} - {sliderValue[1]})
              </Typography>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                onChangeCommitted={handleRatingChangeCommitted}
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
                sx={{ color: "#1976d2" }}
              />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2} mt={2}>
          {discoverdData?.map((movie, index) => (
            <Grid item key={`${movie.id}-${index}`} xs={12} md={6} lg={4}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        {(loading || initialLoading) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <Loader />
          </Box>
        )}
      </Container>

      {!loading && !initialLoading && discoverdData.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="white">
            No results found. Try adjusting your filters.
          </Typography>
        </Box>
      )}
    </Background>
  );
};

export default Explore;
