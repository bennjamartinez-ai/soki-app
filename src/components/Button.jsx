export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {

  const variants = {
    primary:
      "bg-amber-200 text-black hover:bg-amber-300",

    secondary:
      "bg-zinc-800 text-white hover:bg-zinc-700",

    danger:
      "bg-red-500 text-white hover:bg-red-600",

    success:
      "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl
        px-5
        py-2.5
        font-semibold
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}