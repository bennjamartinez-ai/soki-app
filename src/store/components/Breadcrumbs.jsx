import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  items,
}) {
  return (
    <nav className="mx-auto mb-6 flex max-w-[1800px] items-center gap-2 overflow-x-auto whitespace-nowrap px-4 text-sm text-zinc-500 sm:px-6 lg:mb-8 lg:px-8">

      {items.map((item, index) => {

        const last =
          index === items.length - 1;

        return (
          <div
            key={index}
            className="flex shrink-0 items-center gap-2"
          >

            {last ? (

              <span className="font-medium text-zinc-900">
                {item.label}
              </span>

            ) : (

              <Link
                to={item.href}
                className="transition hover:text-black"
              >
                {item.label}
              </Link>

            )}

            {!last && (
              <ChevronRight
                size={14}
                className="text-zinc-400"
              />
            )}

          </div>
        );

      })}

    </nav>
  );
}