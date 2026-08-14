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
      label: "Mis pedidos",
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
            <h2 className="text-3xl font-bold">
              Configuración
            </h2>

            <p className="mt-3 text-zinc-600">
              Próximamente podrás modificar la configuración de tu cuenta.
            </p>
          </>
        );

      default:
  return <AccountProfile />;
  
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">

      {/* ENCABEZADO */}

      <div className="mb-8">

        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          MI CUENTA
        </p>

        <h1 className="mt-2 text-3xl font-bold text-zinc-900">
          Hola,{" "}
          {profile?.full_name ||
            user?.email?.split("@")[0] ||
            "Usuario"}{" "}
          👋
        </h1>

      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

        {/* SIDEBAR */}

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-5">

          <div className="space-y-2">

            {menu.map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-left font-medium transition ${
                    tab === item.id
                      ? "bg-black text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >

                  <Icon size={20} />

                  {item.label}

                </button>

              );

            })}

          </div>

        </aside>

        {/* CONTENIDO */}

        <section className="rounded-3xl border border-zinc-200 bg-white p-10">

          {renderContent()}

        </section>

      </div>

    </main>
  );
}       