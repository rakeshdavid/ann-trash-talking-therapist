import React from 'react';

const BackgroundImage = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/figma-assets/backgroundpattern.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default BackgroundImage;
