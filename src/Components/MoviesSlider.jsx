import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const MoviesSlider = ({ data }) => {
  console.log("Data in MoviesSlider:", data);
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
          dots: true,
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
  return (
    <Box sx={{ p: 2, borderRadius: 2, mb: 4, maxWidth: "90%", mx: "auto" }}>
      <Slider {...settings}>
        {data?.length > 0 ? (
          data.map((item) => <MovieCard key={item.id} movie={item} />)
        ) : (
          <Typography variant="h6" color="text.secondary" align="center">
            No Movies Found
          </Typography>
        )}
      </Slider>
    </Box>
  );
};

export default MoviesSlider;
