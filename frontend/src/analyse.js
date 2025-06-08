import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-DDCL0V598Y";

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

console.log("analyse.js chargé");
