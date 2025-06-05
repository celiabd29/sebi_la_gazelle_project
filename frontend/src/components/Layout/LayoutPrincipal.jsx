import { Outlet } from "react-router-dom";
import Header from "./Header";

const LayoutPrincipal = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutPrincipal;
