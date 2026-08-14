import { Link } from "react-router-dom";

function SearchSuggestions({
  products,
  search,
  onSelect,
}) {
  const text = search.trim().toLowerCase();

  if (!text) return null;

  const startsWith = products.filter((product) =>
    product.name.toLowerCase().startsWith(text)
  );

  const contains = products.filter(
    (product) =>
      !product.name.toLowerCase().startsWith(text) &&
      product.name.toLowerCase().includes(text)
  );

  const suggestions = [...startsWith, ...contains].slice(0, 5);

  if (suggestions.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-[105%] z-50 rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
        <p className="text-center text-zinc-500">
          No se encontraron productos.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-[105%] z-50 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl">

      {suggestions.map((product) => (
        <Link
          key={product.id}
          to={`/productos?search=${encodeURIComponent(product.name)}`}
          onClick={onSelect}
          className="flex items-center gap-4 border-b border-zinc-100 px-4 py-3 transition hover:bg-zinc-50 last:border-none"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-zinc-400">
                Sin imagen
              </span>
            )}
          </div>

          <div className="flex-1">
            <p className="font-medium text-zinc-900">
              {product.name}
            </p>

            <p className="text-sm text-zinc-500">
              {product.category}
            </p>
          </div>

          <div className="font-semibold">
            ${Number(product.price).toLocaleString("es-AR")}
          </div>
        </Link>
      ))}

      <Link
        to={`/productos?search=${encodeURIComponent(search)}`}
        onClick={onSelect}
        className="block border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-center font-medium transition hover:bg-zinc-100"
      >
        Ver todos los resultados →
      </Link>

    </div>
  );
}

export default SearchSuggestions;