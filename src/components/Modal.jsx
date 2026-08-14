export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-md max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
      >
        <div className="border-b border-zinc-800 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
            SOKI
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-zinc-400">
              {description}
            </p>
          )}
        </div>

        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}