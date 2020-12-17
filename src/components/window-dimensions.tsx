import { useState, useEffect } from 'react';

const breakpointDesktop = 1150;
const breakpointTablet = 900;
const breakpointMobile = 650;

export enum WindowTypes {
  Mobile = 'MOBILE',
  Tablet = 'TABLET',
  NarrowDesktop = 'NARROW',
  Desktop = 'DESKTOP',
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  const windowType = `${
    width < breakpointMobile
      ? WindowTypes.Mobile
      : width < breakpointTablet
      ? WindowTypes.Tablet
      : `${
          width < breakpointDesktop
            ? WindowTypes.NarrowDesktop
            : WindowTypes.Desktop
        }`
  }`;
  return {
    width,
    height,
    windowType,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
