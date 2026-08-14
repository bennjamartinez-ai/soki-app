import { X } from "lucide-react";
import { useState } from "react";

export default function PromoBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex h-10 items-center justify-center bg-black px-6 text-sm font-medium text-white">

      <p>
        Hasta 6 cuotas sin interés · Envíos gratis desde $80.000
      </p>

      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 transition hover:opacity-70"
      >
        <X size={18} />
      </button>

    </div>
  );
}