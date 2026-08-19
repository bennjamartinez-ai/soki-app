import { Search } from "lucide-react";

export default function StoreSearch({
  search,
  setSearch,
}) {
  return (
    <div className="relative mb-6">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Buscar producto..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 outline-none"
      />

    </div>
  );
}