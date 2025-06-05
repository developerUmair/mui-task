import { Box } from "@mui/material";
import styled from "styled-components";

  export const Background = styled(Box)(() => ({
    position: "relative",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",

    color: "#fff",
    minHeight: "100vh",
     width: "100%",
  }));


export const formatDate = (dateString) => {
  if (!dateString) return null;

  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    console.error("Invalid date:", dateString);
    return null;
  }
};


export const formatRuntime = (totalMinutes) => {
  if (!totalMinutes || isNaN(totalMinutes)) return null;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';
  if (hours > 0) result += `${hours}h`;
  if (minutes > 0) result += (hours > 0 ? ' ' : '') + `${minutes} mins`;

  return result.trim();
};

