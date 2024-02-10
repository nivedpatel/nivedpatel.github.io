import { Outlet } from "react-router-dom";
import Navigation from "./Pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 bg-zinc-800 h-[100vh]">
        <Outlet />
      </main>
    </>
  );
};

export default App;