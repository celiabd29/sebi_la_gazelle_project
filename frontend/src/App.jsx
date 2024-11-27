import { Outlet } from "react-router-dom";
import Layout from "./components/Layout/Header";

const App = () => {
  return (
    <Layout>
      <main className="flex-1">
        <Outlet />
      </main>
    </Layout>
  );
};

export default App;
