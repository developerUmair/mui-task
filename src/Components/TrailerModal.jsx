import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getVideos } from "../services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const TrailerModal = ({ onClose, open, id, mediaType }) => {
    const [trailer, setTrailer] = useState(null);

    const trailerVideo = trailer?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

  useEffect(() => {
  const fetchVideos = async () => {
    try {
      const data = await getVideos({id, mediaType});
      setTrailer(data.results); 
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  fetchVideos();
}, [id, mediaType]);


  return (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {trailerVideo ? (
        <iframe
          width="600"
          height="500"
          src={`https://www.youtube.com/embed/${trailerVideo.key}`}
          title="YouTube trailer player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          No trailer available
        </Typography>
      )}
    </Box>
  </Modal>
);

};

export default TrailerModal;
