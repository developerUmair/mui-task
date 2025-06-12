import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function CastCard({ cast }) {
  return (
    <Card sx={{ maxWidth: 270, bgcolor: "#203a43", borderRadius: "30px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={
            cast?.profile_path?.length > 0
              ? `https://image.tmdb.org/t/p/w500${cast?.profile_path}`
              : "/images/avatar-backup.png"
          }
          alt="testing"
          sx={{
            maxWidth: 270,
            maxHeight: 250,
            aspectRatio: "1/1",
            width: "100%",
            objectFit: "fill",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={500}
            textAlign="center"
            component="div"
            color="white"
          >
            {cast?.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={300}
            fontSize={15}
            textAlign="center"
            component="div"
            color="white"
          >
            {cast?.character}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
