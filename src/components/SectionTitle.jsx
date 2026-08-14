function SectionTitle({
  overline,
  title,
  subtitle,
  align = "left",
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-14 max-w-3xl text-center"
          : "mb-14"
      }
    >
      {overline && (
        <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-brown">
          {overline}
        </p>
      )}

      <h2 className="font-display text-5xl leading-none text-soki-dark md:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-8 text-soki-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;