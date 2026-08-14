import { Link } from "react-router-dom";

export default function MobileMenu({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 lg:hidden"
      onClick={onClose}
    >
      <aside
        onClick={(e) =>
          e.stopPropagation()
        }
        className="h-full w-72 bg-white p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          className="mb-8 text-sm font-semibold text-zinc-500"
        >
          Cerrar
        </button>

        <nav className="flex flex-col gap-6">

          <Link
            to="/"
            onClick={onClose}
          >
            Inicio
          </Link>

          <Link
            to="/productos"
            onClick={onClose}
          >
            Productos
          </Link>

          <Link
            to="/nosotros"
            onClick={onClose}
          >
            Nosotros
          </Link>

          <Link
            to="/contacto"
            onClick={onClose}
          >
            Contacto
          </Link>

        </nav>

      </aside>

    </div>
  );
}