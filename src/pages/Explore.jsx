import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
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
import { Background, sortOptions } from "../utils";
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
  const [releaseDateGreaterThan, setReleaseDateGreaterThan] = useState(null);
  const [releaseDateLessThan, setReleaseDateLessThan] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
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
          releaseDateGte: releaseDateGreaterThan || undefined,
          releaseDateLte: releaseDateLessThan || undefined,
          sortBy: sortBy,
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
    [
      mediaType,
      selectedGenres,
      rating,
      releaseDateGreaterThan,
      releaseDateLessThan,
      sortBy,
    ]
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
    setPage(1);
    fetchDiscoverdData(1, true);
  }, [mediaType]);

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

  const handleClickFilters = () => {
    setPage(1);
    fetchDiscoverdData(1, true);
  };

  const handleShowFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setRating([0, 10]);
    setSliderValue([0, 10]);
    setReleaseDateGreaterThan(null);
    setReleaseDateLessThan(null);
    setSortBy(null);
    setPage(1);
    fetchDiscoverdData(1, true);
  };

  return (
    <Background>
      <Container>
        <Box sx={{ pt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Filters">
            <TuneIcon
              sx={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={handleShowFilters}
            />
          </Tooltip>
        </Box>
        {showFilters ? (
          <Grid container spacing={3} sx={{ pt: 4 }}>
            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography gutterBottom sx={{ color: "white" }}>
                Select Genres
              </Typography>
              <FormControl fullWidth size="small">
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
                  MenuProps={{
                    MenuListProps: {
                      sx: {
                        "& .Mui-selected": {
                          backgroundColor: "#1976d2 !important",
                          color: "white",
                        },
                        "& .Mui-selected:hover": {
                          backgroundColor: "#1565c0 !important",
                        },
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "#2a2a40",
                        },
                      },
                    },
                  }}
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
                          sx={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            "& .MuiChip-deleteIcon": {
                              color: "white",
                            },
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
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography gutterBottom sx={{ color: "white" }}>
                Sort By
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-label" sx={{ color: "#0f2027" }}>
                  Sort By
                </InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  input={<OutlinedInput label="Sort By" />}
                  sx={{
                    color: "white",
                    "& .MuiSvgIcon-root": { color: "white" },
                    "& fieldset": { borderColor: "blue" },
                    borderRadius: 4,
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem value={option.key} key={option.key}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
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
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography gutterBottom sx={{ color: "white" }}>
                Release Year Greater than
              </Typography>
              <TextField
                type="date"
                value={releaseDateGreaterThan}
                onChange={(e) => setReleaseDateGreaterThan(e.target.value)}
                fullWidth
                sx={{
                  input: { color: "white", paddingY: 1 },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                      borderRadius: 4,
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography gutterBottom sx={{ color: "white" }}>
                Release Year Less than
              </Typography>
              <TextField
                type="date"
                value={releaseDateLessThan}
                onChange={(e) => setReleaseDateLessThan(e.target.value)}
                fullWidth
                sx={{
                  input: { color: "white", paddingY: 1 },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                      borderRadius: 4,
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleClickFilters}
                sx={{ borderRadius: 3, mt: { lg: 3.5 } }}
              >
                Apply
              </Button>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={clearFilters}
                sx={{ borderRadius: 3, mt: { lg: 3.5 } }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        ) : null}

        <Typography variant="h5" component="h1" gutterBottom marginTop={4}>
          {mediaType === "tv" ? "Discover TV Shows" : "Discover Movies"}
        </Typography>
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
