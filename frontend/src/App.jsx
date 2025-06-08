import Header from "./components/Layout/Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "./analyse";
import { Outlet } from "react-router-dom";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
