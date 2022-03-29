import { useState, useEffect } from 'react';

export const BREAKPOINT_DESKTOP = 1300;
export const BREAKPOINT_TABLET = 1025;
export const BREAKPOINT_MOBILE = 680;

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
    width < BREAKPOINT_MOBILE
      ? WindowTypes.Mobile
      : width < BREAKPOINT_TABLET
      ? WindowTypes.Tablet
      : width < BREAKPOINT_DESKTOP
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
