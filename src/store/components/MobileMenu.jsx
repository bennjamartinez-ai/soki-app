import { Link, useLocation } from "react-router-dom";
import {
  X,
  House,
  ShoppingBag,
  Users,
  Mail,
} from "lucide-react";

export default function MobileMenu({
  open,
  onClose,
}) {
  const { pathname } = useLocation();

  if (!open) return null;

  const links = [
    {
      to: "/",
      label: "Inicio",
      icon: House,
    },
    {
      to: "/productos",
      label: "Productos",
      icon: ShoppingBag,
    },
    {
      to: "/nosotros",
      label: "Nosotros",
      icon: Users,
    },
    {
      to: "/contacto",
      label: "Contacto",
      icon: Mail,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >

      <aside
        onClick={(e) => e.stopPropagation()}
        className="fixed left-0 top-0 flex h-screen w-[82%] max-w-xs flex-col bg-white shadow-2xl"
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">

          <h2 className="text-2xl font-black tracking-[0.25em]">
            SOKI
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Links */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {links.map((link) => {
              const Icon = link.icon;

              const active =
                pathname === link.to ||
                (link.to === "/productos" &&
                  pathname.startsWith("/producto"));

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-base font-medium transition ${
                    active
                      ? "bg-black text-white"
                      : "hover:bg-zinc-100"
                  }`}
                >

                  <Icon size={20} />

                  {link.label}

                </Link>
              );
            })}

          </div>

        </nav>

        {/* Footer */}

        <div className="border-t border-zinc-200 p-6">

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
            SOKI
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Medias y accesorios con estilo.
          </p>

        </div>

      </aside>

    </div>
  );
}