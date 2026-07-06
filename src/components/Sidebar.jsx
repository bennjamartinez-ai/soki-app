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
  return (
    <aside className="w-72 min-h-screen border-r border-zinc-800 bg-zinc-900 p-6">

      <h1 className="mb-12 text-4xl font-bold text-amber-200">
        Soki
      </h1>

      <nav className="space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-amber-200 font-semibold text-black"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`
              }
            >

              <Icon size={20} />

              {item.name}

            </NavLink>

          );

        })}

      </nav>

    </aside>
  );
}