import {
  Box,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { moviesContext } from "../context/MoviesDataContext";
import { useLocation } from "react-router-dom";
import { getDiscoveredMoviesAndTvShows, getGenras } from "../services";
import { WindowRounded } from "@mui/icons-material";
import MovieCard from "../Components/MovieCard";
import { Background } from "../utils";

const Explore = () => {
  const location = useLocation();
  const mediaType = location.pathname.includes("/tv") ? "tv" : "movie";

  const { genras, setGenras } = useContext(moviesContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [discoverdData, setDiscoverdData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedGenres(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = (chipToDelete) => () => {
    setSelectedGenres((chips) =>
      chips.filter((chip) => chip.id !== chipToDelete.id)
    );
  };

  useEffect(() => {
    const fetchGenrasList = async () => {
      try {
        setLoading(true);
        const genrasData = await getGenras(mediaType);
        setGenras(genrasData.genres);
      } catch (error) {
        console.error("Trending Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenrasList();
  }, [mediaType]);

  useEffect(() => {
    const fetchDiscoverdData = async () => {
      try {
        const genreIds = selectedGenres.map((g) => g.id).join(",");
        const response = await getDiscoveredMoviesAndTvShows({
          mediaType,
          page,
          genres: genreIds || undefined,
        });
        setDiscoverdData((prev) => [...prev, ...response.results]);
        setLoading(false);
      } catch (error) {
        console.error("Trending Fetch Error:", error);
      }
    };

    fetchDiscoverdData();
  }, [page, selectedGenres, mediaType]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const windowHeight = window.innerHeight;

      if (Math.ceil(scrollTop + windowHeight + 1) >= scrollHeight) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Background>
      <Container>
        <Box
          sx={{
            display: "flex",
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
                        onMouseDown={(e) => e.stopPropagation()} // Prevent dropdown toggle
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleDelete(genre)();
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
                {genras?.length > 0 &&
                  genras.map((genre) => (
                    <MenuItem key={genre.id} value={genre}>
                      {genre.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={2} mt={2}>
          {discoverdData?.map((movie, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <MovieCard key={movie.id} movie={movie} />
            </Grid>
          ))}
        </Grid>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Background>
  );
};

export default Explore;
