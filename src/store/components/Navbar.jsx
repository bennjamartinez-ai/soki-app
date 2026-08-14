import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const { cart } = useCart();

  const { pathname } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function isActive(path) {
    return pathname === path;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-[1800px] items-center px-4 lg:px-8">

        {/* IZQUIERDA */}

        <div className="flex flex-1 items-center gap-4 lg:gap-8">

          <button
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="rounded-full p-3 transition hover:bg-zinc-100 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <Link
            to="/"
            className="text-3xl font-black tracking-[0.35em]"
          >
            SOKI
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              to="/"
              className={`text-sm font-medium transition ${
                isActive("/")
                  ? "text-black"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              className={`text-sm font-medium transition ${
                pathname.startsWith("/producto") ||
                isActive("/productos")
                  ? "text-black"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              Productos
            </Link>

            <Link
              to="/nosotros"
              className={`text-sm font-medium transition ${
                isActive("/nosotros")
                  ? "text-black"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              Nosotros
            </Link>

            <Link
              to="/contacto"
              className={`text-sm font-medium transition ${
                isActive("/contacto")
                  ? "text-black"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              Contacto
            </Link>

          </nav>

        </div>

        {/* DERECHA */}

        <div className="ml-auto flex items-center gap-2 lg:gap-4">

          {/* BUSCADOR */}

          {pathname === "/" && (

            <div className="hidden items-center rounded-full bg-zinc-100 px-4 lg:flex">

              <Search
                size={18}
                className="text-zinc-500"
              />

              <input
                type="text"
                placeholder="Buscar"
                className="h-11 w-52 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-500"
              />

            </div>

          )}

          {/* USUARIO */}

          <div className="hidden lg:block">
            <UserMenu />
          </div>

          {/* CARRITO */}

          <Link
            to="/carrito"
            className="relative rounded-full p-3 transition hover:bg-zinc-100"
          >

            <ShoppingCart size={22} />

            {totalItems > 0 && (

              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-bold text-white">

                {totalItems}

              </span>

            )}

          </Link>

        </div>

      </div>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() =>
          setMobileMenuOpen(false)
        }
      />

    </header>
  );
}

export default Navbar;