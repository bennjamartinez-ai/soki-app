export default function Input({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        bg-zinc-800/80
        p-3
        outline-none
        transition
        focus:ring-2
        focus:ring-amber-200
        ${className}
      `}
    />
  );
}