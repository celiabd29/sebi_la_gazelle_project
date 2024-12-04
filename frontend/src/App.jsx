import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/footer";
const App = () => {
  return (
    <>
    <Header />
        <Outlet />
    <Footer />
    </>
  );
};

export default App;
