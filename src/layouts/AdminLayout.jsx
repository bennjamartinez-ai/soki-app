import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-zinc-950 text-white">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`h-screen overflow-y-auto overflow-x-auto p-4 transition-all duration-300 md:p-6 lg:p-8 ${
          collapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;