export default function SwitchField({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
      />

      {label}

    </label>
  );
}