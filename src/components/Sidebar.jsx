import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Receipt,
  BarChart3,
  Settings,
  Users
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Productos",
    path: "/products",
    icon: Package,
  },
  {
    name: "Nueva Venta",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Compras",
    path: "/purchases",
    icon: Truck,
  },
  {
  name: "Proveedores",
  path: "/providers",
  icon: Users,
},
  {
    name: "Ventas",
    path: "/sales",
    icon: Receipt,
  },
  {
    name: "Estadísticas",
    path: "/statistics",
    icon: BarChart3,
  },
  {
    name: "Configuración",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  return (
 <aside
  className={`${
    collapsed ? "w-20 p-3" : "w-72 p-6"
  } min-h-screen border-r border-zinc-800 bg-zinc-900 transition-all duration-300`}
>
      <div className="mb-10 flex items-center justify-between">

  {!collapsed && (
    <h1 className="text-4xl font-bold text-amber-200">
      Soki
    </h1>
  )}

  <button
    onClick={() => setCollapsed(!collapsed)}
    className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
  >
    {collapsed ? (
      <PanelLeftOpen size={22} />
    ) : (
      <PanelLeftClose size={22} />
    )}
  </button>

</div>

      <nav
  className={`${
    collapsed ? "space-y-4" : "space-y-2"
  }`}
>

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${
                collapsed ? "justify-center" : "justify-start gap-3"
              } w-full rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-amber-200 font-semibold text-black"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >

            <Icon className="flex-shrink-0" size={20} />

            {!collapsed && (
              <span className="whitespace-nowrap">
                {item.name}
              </span>
            )}

          </NavLink>

          );

        })}

      </nav>

    </aside>
  );
}