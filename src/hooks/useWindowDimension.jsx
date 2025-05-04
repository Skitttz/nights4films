import React from 'react';

const getWindowDimensions = () => {
  let isMobile;
  if (typeof window === 'undefined') {
    return {
      width: 0,
      isMobile: false,
    };
  }

  const { innerWidth: width } = window;
  if (width < 768) {
    isMobile = true;
  } else {
    isMobile = false;
  }

  return { width, isMobile };
};

export default function useWindowDimensions() {
  const [windowDimesions, setWindowDimensions] = React.useState(
    getWindowDimensions(),
  );

  React.useEffect(() => {
    const handleSize = () => {
      setWindowDimensions(getWindowDimensions);
    };

    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return windowDimesions;
}
