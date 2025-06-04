import React from "react";

const TeaserVideo = ({ data }) => {
  if (!data?.results) return <p>No videos available</p>;

  // Try to find a teaser based on the name
  const teaser = data.results.find(video =>
    video.name.toLowerCase().includes("teaser")
  );

  if (!teaser) return <p>No teaser video found.</p>;

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube.com/embed/${teaser.key}`}
        title={teaser.name}
        allowFullScreen
        className="w-full h-full rounded-lg shadow-md"
      ></iframe>
      <p className="mt-2 text-sm">{teaser.name}</p>
    </div>
  );
};

export default TeaserVideo;
