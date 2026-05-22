// Montage.js
import React from 'react';

const Montage = () => {
  return (
    <section className="w-full">
      <div className="relative w-full h-0" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/UhVjp48U2Oc?autoplay=1&mute=0"
          title="Montage Video"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Montage;
