import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../context/ProductsContext";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar() {
  const navigate = useNavigate();
  const { products } = useProducts();

  const [search, setSearch] = useState("");

  function handleEnter(e) {
    if (e.key !== "Enter") return;

    const text = search.trim();

    if (!text) return;

    navigate(
      `/productos?search=${encodeURIComponent(text)}`
    );

    setSearch("");
  }

  function handleSelect() {
    setSearch("");
  }

  return (
    <section className="border-b border-zinc-200 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        <StoreSearch
  search={search}
  setSearch={setSearch}
/>

      </div>

    </section>
  );
}