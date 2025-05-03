import React from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width } = window;

  return { width };
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
