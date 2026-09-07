declare module 'bootstrap/dist/css/bootstrap.min.css';
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

declare global {
  interface Window {
    lottie?: any
    initPopupVideo?: any
    initMobileSearchStandalone?: any
    reinitMobileSearch?: any
  }

  interface HTMLElement {
    _lottieAnimation?: any
  }

  interface Element {
    style?: any
    onclick?: any
    focus?: any
    blur?: any
  }
}

export {}
