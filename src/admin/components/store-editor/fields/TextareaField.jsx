export default function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
      />

    </div>
  );
}