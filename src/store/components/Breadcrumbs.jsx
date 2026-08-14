import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  items,
}) {
  return (
    <nav className="mx-auto mb-8 flex max-w-[1800px] items-center gap-2 px-8 text-sm text-zinc-500">

      {items.map((item, index) => {

        const last =
          index === items.length - 1;

        return (
          <div
            key={index}
            className="flex items-center gap-2"
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
              <ChevronRight size={14} />
            )}

          </div>
        );
      })}

    </nav>
  );
}