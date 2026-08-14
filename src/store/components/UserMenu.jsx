import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ChevronDown,
  LogOut,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function UserMenu() {

  const {

    user,

    profile,

    logout,

    isAdmin,

    isWholesale,

  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef(null);

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

  if (!user) {

    return (

      <Link
        to="/login"
        className="rounded-full p-3 transition hover:bg-zinc-100"
      >

        <User size={22} />

      </Link>

    );

  }

  return (

    <div
      ref={menuRef}
      className="relative"
    >

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-3 rounded-full border border-soki-border bg-white px-4 py-2 transition hover:bg-soki-surface"
      >

        <div className="text-right">

          <p className="text-sm font-semibold text-soki-dark">

            {profile?.full_name || user.email}

          </p>

          <p className="text-xs uppercase tracking-wider text-soki-muted">

            {profile?.role}

          </p>

        </div>

        <ChevronDown
          size={18}
          className={`transition duration-200 ${
            open
              ? "rotate-180"
              : ""
          }`}
        />

      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-soki-border bg-white shadow-xl">

          <div className="border-b border-soki-border p-5">

            <p className="font-semibold text-soki-dark">

              {profile?.full_name}

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
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
            >

              <LogOut size={18} />

              Cerrar sesión

            </button>

          </div>

        </div>

      )}

    </div>

  );

}