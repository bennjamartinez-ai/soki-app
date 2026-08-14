import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "bg-black text-white hover:opacity-90",

    secondary:
      "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100",

    danger:
      "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}