import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const messages = [
  "🚚 Envíos a todo el país",
  "💳 Hasta 6 cuotas sin interés",
  "🎁 En compras superiores a $60.000 el envío es gratis",
  "⭐ Calidad garantizada en todos nuestros productos",
];

export default function TopBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  function change(index) {
    setVisible(false);

    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 180);
  }

  function next() {
    change(
      current === messages.length - 1
        ? 0
        : current + 1
    );
  }

  function previous() {
    change(
      current === 0
        ? messages.length - 1
        : current - 1
    );
  }

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="border-b border-zinc-200 bg-[#f5f5f5]">

      <div className="relative mx-auto flex h-11 max-w-[1800px] items-center justify-center px-4 lg:px-8">

        {/* Flecha izquierda */}

        <button
          onClick={previous}
          className="absolute left-6 hidden rounded-full p-1 transition hover:bg-zinc-200 md:block"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Contenido */}

        <div className="flex flex-col items-center">

          <p
            className={`px-2 text-center text-xs font-medium leading-tight tracking-wide transition-all duration-200 md:text-sm ${
              visible
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0"
            }`}
          >
            {messages[current]}
          </p>

          <div className="mt-1 flex gap-2">

            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => change(index)}
                className={`h-1.5 rounded-full transition-all ${
                  current === index
                    ? "w-6 bg-black"
                    : "w-1.5 bg-zinc-300"
                }`}
              />
            ))}

          </div>

        </div>

        {/* Flecha derecha */}

        <button
          onClick={next}
          className="absolute right-6 hidden rounded-full p-1 transition hover:bg-zinc-200 md:block"
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}