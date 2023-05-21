import ReactGA from 'react-ga';

export const initGA = (): void => {
  ReactGA.initialize('G-01J74RK5B9');
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
