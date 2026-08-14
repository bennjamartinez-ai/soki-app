import { Outlet } from "react-router-dom";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";

function StoreLayout() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">

      <TopBar />

      <Navbar />

      <Outlet />

    </div>
  );
}

export default StoreLayout;