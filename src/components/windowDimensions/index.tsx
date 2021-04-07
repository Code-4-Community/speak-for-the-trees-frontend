import { useState, useEffect } from 'react';

const breakpointDesktop = 1300;
const breakpointTablet = 1025;
const breakpointMobile = 680;

export enum WindowTypes {
  Mobile = 'MOBILE',
  Tablet = 'TABLET',
  NarrowDesktop = 'NARROW',
  Desktop = 'DESKTOP',
}

interface WindowDimensions {
  readonly width: number;
  readonly height: number;
  readonly windowType: WindowTypes;
}

const getWindowDimensions = (): WindowDimensions => {
  const { innerWidth: width, innerHeight: height } = window;
  const windowType: WindowTypes =
    width < breakpointMobile
      ? WindowTypes.Mobile
      : width < breakpointTablet
      ? WindowTypes.Tablet
      : width < breakpointDesktop
      ? WindowTypes.NarrowDesktop
      : WindowTypes.Desktop;

  return {
    width,
    height,
    windowType,
  };
};

export default function useWindowDimensions(): WindowDimensions {
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
