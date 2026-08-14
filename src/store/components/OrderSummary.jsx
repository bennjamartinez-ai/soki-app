import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

export default function OrderSummary({ subtotal }) {
  const navigate = useNavigate();

  return (
    <Card className="sticky top-8 h-fit p-8">
      <h2 className="text-3xl font-bold tracking-tight">
        Resumen del pedido
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Revisá tu compra antes de finalizar.
      </p>

      <div className="my-8 space-y-5">
        <div className="flex items-center justify-between text-zinc-600">
          <span>Subtotal</span>

          <span className="font-semibold text-zinc-900">
            ${subtotal.toLocaleString("es-AR")}
          </span>
        </div>

        <div className="flex items-center justify-between text-zinc-600">
          <span>Envío</span>

          <span className="text-zinc-400">
            A calcular
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
        <p className="mb-3 text-sm font-medium">
          ¿Tenés un cupón?
        </p>

        <div className="flex gap-2">
          <Input
            placeholder="Código"
          />

          <Button variant="secondary">
            Aplicar
          </Button>
        </div>
      </div>

      <div className="my-8 border-t border-zinc-200" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">
          Total
        </span>

        <span className="text-4xl font-bold tracking-tight">
          ${subtotal.toLocaleString("es-AR")}
        </span>
      </div>

      <Button
        className="mt-8 w-full py-4 text-lg"
        onClick={() => navigate("/checkout")}
      >
        Finalizar compra
      </Button>

      <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
        <p className="text-sm text-zinc-600">
          ✓ Pago seguro
        </p>

        <p className="mt-2 text-sm text-zinc-600">
          ✓ Atención personalizada
        </p>

        <p className="mt-2 text-sm text-zinc-600">
          ✓ Envíos a todo el país
        </p>
      </div>
    </Card>
  );
}