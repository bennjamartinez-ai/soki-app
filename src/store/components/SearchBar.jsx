import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../context/ProductsContext";
import SearchSuggestions from "./SearchSuggestions";

function SearchBar() {
  const navigate = useNavigate();
  const { products } = useProducts();

  const [search, setSearch] = useState("");

  function handleEnter(e) {
    if (e.key !== "Enter") return;

    const text = search.trim();

    if (!text) return;

    navigate(`/productos?search=${encodeURIComponent(text)}`);
    setSearch("");
  }

  function handleSelect() {
    setSearch("");
  }

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6">
        <div className="relative flex flex-1 items-center rounded-xl border border-zinc-300 bg-white px-4">
          <Search
            size={18}
            className="text-zinc-400"
          />

          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleEnter}
            className="h-12 flex-1 bg-transparent px-3 outline-none"
          />

          <SearchSuggestions
            products={products}
            search={search}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;