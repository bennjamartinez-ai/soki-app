import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import UserMenuMobile from "./UserMenuMobile";

function Navbar() {
  const { cart } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  function isActive(path) {
    return pathname === path;
  }

  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/productos");
      return;
    }

    navigate(
      `/productos?search=${encodeURIComponent(query)}`
    );

    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-4 lg:px-8">

        {/* IZQUIERDA */}

        <div className="flex items-center gap-4 lg:gap-8">

          <button
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="rounded-full p-3 transition hover:bg-zinc-100 lg:hidden"
            aria-label="Abrir menú"
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

        <div className="flex items-center gap-1">

          {/* BUSCADOR */}

          <div className="relative">

            {searchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 top-full mt-3 flex w-72 items-center rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl lg:w-80"
              >

                <Search
                  size={20}
                  className="ml-2 text-zinc-400"
                />

                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Buscar productos..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                  }}
                  className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-black"
                  aria-label="Cerrar búsqueda"
                >
                  <X size={18} />
                </button>

              </form>
            )}

            <button
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="rounded-full p-3 transition hover:bg-zinc-100"
              aria-label="Buscar productos"
            >
              <Search size={22} />
            </button>

          </div>

          {/* USUARIO MÓVIL */}

          <UserMenuMobile />

          {/* USUARIO ESCRITORIO */}

          <div className="hidden lg:block">
            <UserMenu />
          </div>

          {/* CARRITO */}

          <Link
            to="/carrito"
            className="relative rounded-full p-3 transition hover:bg-zinc-100"
            aria-label="Carrito"
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