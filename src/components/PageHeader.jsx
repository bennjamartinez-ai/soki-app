export default function PageHeader({
  title,
  subtitle,
  button,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-zinc-400">
            {subtitle}
          </p>
        )}

      </div>

      {button}

    </div>
  );
}