export enum Orientation {
  LANDSCAPE,
  PORTRAIT,
}

export type DeviceInformation = {
  isIos: boolean;
  isMobileDevice: boolean;
  isTablet: boolean;
  isVersion(val: number): boolean;
  isMacOs: boolean;
  isNewerIpad: boolean;
};

const knownQueries = {
  BIG_DESKTOP: `(max-width:2560px) and (min-width:1200px)`,
  BELOW_BIG_DESKTOP: '(max-width:1199px)',
  DESKTOP: '(max-width:1200px) and (min-width:993px)',
  ABOVE_DESKTOP: '(max-width:1919px) and (min-width:1201px)',
  BELOW_DESKTOP: '(max-width:1199px)',
  ABOVE_MID_DESKTOP: '(min-width:1025px)',
  BELOW_MID_DESKTOP: '(max-width:1024px)',
  TABLET: `(max-width:960px) and (min-width:601px)`,
  BELOW_TABLET: '(max-width:959px)',
  MOBILE: `(max-width:600px)`,
  BELOW_MOBILE: '(max-width:599px)',
  TINY_MOBILE: '(max-width: 389px)',
  LANDSCAPE: `(orientation:landscape)`,
  HOVER: '(hover: hover)',
};

export function useOrientation(): Orientation {
  return window.matchMedia(knownQueries.LANDSCAPE).matches ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
}

export function useDeviceInfo(): DeviceInformation {
  const isMacOs = /(macintosh)/i.test(navigator.userAgent.toLowerCase());
  const canHover = window.matchMedia('(hover: hover)')?.matches;
  const isNewerIpad = isMacOs && !canHover;
  const isIos = isNewerIpad || /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isTablet =
    // eslint-disable-next-line max-len
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      navigator.userAgent.toLowerCase()
    ) || isNewerIpad;
  const isMobileDevice =
    isIos ||
    /Android|webOS|Mobile|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );

  return {
    isIos,
    isMobileDevice,
    isTablet,
    isVersion(number): boolean {
      const match = RegExp(`Version/[ ]*(${number})`, 'i');

      return match.test(navigator.userAgent);
    },
    isMacOs,
    isNewerIpad,
  };
}
