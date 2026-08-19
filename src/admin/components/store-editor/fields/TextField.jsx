export default function TextField({
  label,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
      />

    </div>
  );
}