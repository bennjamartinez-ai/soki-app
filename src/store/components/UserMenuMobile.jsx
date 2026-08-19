import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  LogOut,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function UserMenuMobile() {
  const {
    user,
    profile,
    logout,
    isAdmin,
    isWholesale,
  } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative lg:hidden"
    >

      {/* BOTÓN USUARIO */}

      <button
        onClick={() => setOpen(!open)}
        className="rounded-full p-3 transition hover:bg-zinc-100"
        aria-label="Mi cuenta"
        aria-expanded={open}
      >
        <User size={22} />
      </button>

      {/* MENÚ */}

      {open && (
        <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-3xl border border-soki-border bg-white shadow-xl">

          {!user ? (

            /* ==========================
               NO LOGUEADO
            ========================== */

            <div className="p-3">

              <div className="border-b border-soki-border px-4 py-3">
                <p className="font-semibold text-soki-dark">
                  Tu cuenta Soki
                </p>

                <p className="mt-1 text-sm text-soki-muted">
                  Ingresá o creá tu cuenta
                </p>
              </div>

              <div className="mt-2">

                <Link
                  to="/login"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-soki-dark transition hover:bg-soki-surface"
                >
                  <User size={18} />

                  Ingresá
                </Link>

                <Link
                  to="/login?registro=true"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="mt-1 flex items-center justify-center rounded-2xl bg-soki-dark px-4 py-3 font-semibold text-white transition hover:bg-black"
                >
                  Creá tu cuenta
                </Link>

              </div>

            </div>

          ) : (

            /* ==========================
               LOGUEADO
            ========================== */

            <>
              <div className="border-b border-soki-border p-5">

                <p className="font-semibold text-soki-dark">
                  {profile?.full_name ||
                    user.email}
                </p>

                <p className="mt-1 text-sm text-soki-muted">
                  {user.email}
                </p>

              </div>

              <div className="p-2">

                <Link
                  to="/mi-cuenta"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-soki-surface"
                >
                  <User size={18} />

                  Mi cuenta
                </Link>

                <Link
                  to="/mi-cuenta?tab=pedidos"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-soki-surface"
                >
                  <ShoppingBag size={18} />

                  Mis pedidos
                </Link>

                {isWholesale && (
                  <Link
                    to="/mayorista"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-soki-surface"
                  >
                    <ShoppingBag size={18} />

                    Zona Mayorista
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-soki-surface"
                  >
                    <Shield size={18} />

                    Panel Admin
                  </Link>
                )}

              </div>

              <div className="border-t border-soki-border p-2">

                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />

                  Cerrar sesión
                </button>

              </div>
            </>

          )}

        </div>
      )}

    </div>
  );
}