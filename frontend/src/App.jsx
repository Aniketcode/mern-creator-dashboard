import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
     <Navbar />
      <Toaster />
      <div className="my-2">
        <Outlet />
      </div>
    </>
  );
}

export default App;
