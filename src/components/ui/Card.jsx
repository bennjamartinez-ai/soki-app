import clsx from "clsx";

export default function Card({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-zinc-200 bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}