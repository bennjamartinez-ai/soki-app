import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Receipt,
  BarChart3,
  Settings,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    section: "GENERAL",
    items: [
      {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "VENTAS",
    items: [
      {
        name: "Nueva Venta",
        path: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        name: "Pedidos",
        path: "/admin/store-orders",
        icon: Receipt,
      },
      {
        name: "Ventas",
        path: "/admin/sales",
        icon: Receipt,
      },
    ],
  },
  {
    section: "INVENTARIO",
    items: [
      {
        name: "Productos",
        path: "/admin/products",
        icon: Package,
      },
      {
        name: "Compras",
        path: "/admin/purchases",
        icon: Truck,
      },
      {
        name: "Proveedores",
        path: "/admin/providers",
        icon: Users,
      },
    ],
  },
  {
    section: "CRM",
    items: [
      {
        name: "Mayoristas",
        path: "/admin/wholesale",
        icon: Users,
      },
    ],
  },
  {
    section: "ANÁLISIS",
    items: [
      {
        name: "Estadísticas",
        path: "/admin/statistics",
        icon: BarChart3,
      },
    ],
  },
  {
    section: "SISTEMA",
    items: [
      {
        name: "Configuración",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

function Sidebar({
  collapsed,
  setCollapsed,
}) {
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* CABECERA */}

      <div
        className={`flex h-20 items-center border-b border-zinc-800 ${
          collapsed
            ? "justify-center px-3"
            : "justify-between px-6"
        }`}
      >
        {!collapsed && (
          <h1 className="text-4xl font-bold text-amber-200">
            Soki
          </h1>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>
      </div>

      {/* MENÚ */}

      <div className="flex-1 overflow-y-auto px-3 py-5">

        {menu.map((group) => (

          <div
            key={group.section}
            className="mb-8"
          >
            {!collapsed && (
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                {group.section}
              </p>
            )}

            <div className="space-y-2">

              {group.items.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                      `flex items-center rounded-xl py-3 transition ${
                        collapsed
                          ? "justify-center px-2"
                          : "gap-3 px-4"
                      } ${
                        isActive
                          ? "bg-amber-200 font-semibold text-black"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon
                      size={20}
                      className="flex-shrink-0"
                    />

                    {!collapsed && (
                      <span>{item.name}</span>
                    )}
                  </NavLink>
                );

              })}

            </div>

          </div>

        ))}

      </div>

    </aside>
  );
}

export default Sidebar;