import { useState } from "react";
import {
  User,
  Heart,
  ShoppingBag,
  Settings,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import AccountFavorites from "./components/AccountFavorites";
import AccountOrders from "./components/AccountOrders";
import AccountProfile from "./components/AccountProfile";

export default function AccountPage() {
  const { profile, user } = useAuth();

  const [tab, setTab] = useState("profile");

  const menu = [
    {
      id: "profile",
      label: "Perfil",
      icon: User,
    },
    {
      id: "favorites",
      label: "Favoritos",
      icon: Heart,
    },
    {
      id: "orders",
      label: "Pedidos",
      icon: ShoppingBag,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: Settings,
    },
  ];

  function renderContent() {
    switch (tab) {
      case "favorites":
        return <AccountFavorites />;

      case "orders":
        return <AccountOrders />;

      case "settings":
        return (
          <>
            <h2 className="text-xl font-bold lg:text-2xl">
              Configuración
            </h2>

            <p className="mt-2 text-zinc-600">
              Próximamente podrás modificar la configuración de tu cuenta.
            </p>
          </>
        );

      default:
        return <AccountProfile />;
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

      {/* CABECERA */}

      <header className="mb-8">

        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          MI CUENTA
        </p>

        <h1 className="mt-2 text-3xl font-bold leading-tight lg:text-4xl">
          Hola,{" "}
          {profile?.full_name ||
            user?.email?.split("@")[0] ||
            "Usuario"}{" "}
          👋
        </h1>

      </header>

      {/* MENÚ */}

      <nav className="mb-8 flex gap-2 overflow-x-auto pb-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
                tab === item.id
                  ? "bg-black text-white"
                  : "border border-zinc-200 bg-white hover:border-black"
              }`}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}

      </nav>

      {/* CONTENIDO */}

      <section>

        {renderContent()}

      </section>

    </main>
  );
}