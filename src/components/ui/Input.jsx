import clsx from "clsx";

export default function Input({
  className,
  ...props
}) {
  return (
    <input
      className={clsx(
        "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition",
        "placeholder:text-zinc-400",
        "focus:border-black",
        className
      )}
      {...props}
    />
  );
}