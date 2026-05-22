// src/components/BackgroundVideo.js
import React from 'react';

const BackgroundVideo = ({children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src='/videos/dotted_bg.mp4'
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;
