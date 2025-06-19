import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { keyframes } from "@emotion/react";
import Loader from "./Loader";
import { Background } from "../utils/helpers";
import SectionTitle from "./SectionTitle";
import MoviesSlider from "./MoviesSlider";
import { moviesContext } from "../context/MoviesDataContext";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import MovieCard from "./MovieCard";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const HeroSection = ({ data }) => {
  const [search, setSearch] = useState("");
  const {
    searchMovies,
    searchResults,
    loading,
    searchPage,
    hasMoreSearchResults,
    isSearching,
  } = useContext(moviesContext);

  useEffect(() => {
    if (search.trim() === "") return;

    const timer = setTimeout(() => {
      searchMovies(search, 1, false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (
        isBottom &&
        !loading &&
        !isSearching &&
        hasMoreSearchResults &&
        search.trim() !== ""
      ) {
        const nextPage = searchPage + 1;
        searchMovies(search, nextPage, true); // append next page
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [search, searchPage, loading, isSearching, hasMoreSearchResults]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "80vh",
          overflow: "hidden",
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        <Slider {...settings}>
          {data?.map((movie) => (
            <Box
              key={movie.id}
              sx={{
                height: "90vh",
                backgroundImage: `url(${IMAGE_BASE_URL}${
                  movie.backdrop_path || movie.poster_path
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  background: `
                    linear-gradient(
                      to bottom,
                      rgba(44, 83, 100, 0.7) 0%,
                      rgba(32, 58, 67, 0.6) 50%,
                      rgba(15, 32, 39, 0.8) 100%
                    )
                  `,
                },
              }}
            />
          ))}
        </Slider>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              What would you like to watch tonight?
            </Typography>
            <TextField
              value={search}
              onChange={handleSearchChange}
              fullWidth
              variant="outlined"
              placeholder="Search by title, actor, or genre..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {search?.length > 0 ? (
                      <ClearRoundedIcon
                        onClick={handleClearSearch}
                        sx={{ cursor: "pointer" }}
                      />
                    ) : null}
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& input": {
                    color: "#000",
                  },
                },
              }}
            />
          </Container>
        </Box>
      </Box>

      {/* Search Results Section */}
      {search.trim() !== "" && (
        <Background>
          <SectionTitle title={`Search Results for ${search}`} />

          <Grid
            container
            spacing={2}
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
              {searchResults.length > 0 ? (
                searchResults.map((movie, index) => (
                  <Grid item key={`${movie.id}-${index}`} xs={12} md={6} lg={4}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))
              ) : !loading ? (
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", mt: 4, color: "#ccc" }}
                  >
                    No results found for "{search}"
                  </Typography>
                </Grid>
              ) : null}

              {loading && (
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 4 }}
                  >
                    <Loader />
                  </Box>
                </Grid>
              )}
          </Grid>
        </Background>
      )}
    </>
  );
};

export default HeroSection;
