export default function OrderStatusBadge({
  status,
}) {
  const config = {
    pending: {
      label: "Pendiente",
      className:
        "bg-yellow-100 text-yellow-700",
    },

    paid: {
      label: "Pagado",
      className:
        "bg-blue-100 text-blue-700",
    },

    preparing: {
      label: "Preparando",
      className:
        "bg-purple-100 text-purple-700",
    },

    shipped: {
      label: "Enviado",
      className:
        "bg-green-100 text-green-700",
    },

    delivered: {
      label: "Entregado",
      className:
        "bg-emerald-100 text-emerald-700",
    },

    cancelled: {
      label: "Cancelado",
      className:
        "bg-red-100 text-red-700",
    },
  };

  const current =
    config[status] ?? {
      label: status,
      className:
        "bg-zinc-100 text-zinc-700",
    };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold lg:px-4 lg:py-2 lg:text-sm ${current.className}`}
    >
      {current.label}
    </span>
  );
}