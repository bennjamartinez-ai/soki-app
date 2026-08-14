import { useSales } from "../context/SalesContext";
import StatCard from "../components/StatCard";

export default function Statistics() {

 const { sales } = useSales();

  const completedSales = sales.filter(
  (sale) => sale.status !== "cancelled"
);


  const now = new Date();

  // HOY
  const todaySales = completedSales.filter((sale) => {
    const date = new Date(sale.createdAt);

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const todayIncome = todaySales.reduce(
    (total, sale) => total + sale.total,
    0
  );

  // SEMANA

  const day = now.getDay();

  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weekSales = completedSales.filter((sale) => {
    const date = new Date(sale.createdAt);
    return date >= monday && date <= sunday;
  });

  const weekIncome = weekSales.reduce(
    (total, sale) => total + sale.total,
    0
  );

  // MES

  const monthSales = completedSales.filter((sale) => {
    const date = new Date(sale.createdAt);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const monthIncome = monthSales.reduce(
    (total, sale) => total + sale.total,
    0
  );

  // TICKET PROMEDIO

  const averageTicket =
    completedSales.length === 0
      ? 0
      : completedSales.reduce(
          (total, sale) => total + sale.total,
          0
        ) / completedSales.length;

// PRODUCTOS MÁS VENDIDOS

const productStats = {};

completedSales.forEach((sale) => {

  sale.items.forEach((item) => {

    if (!productStats[item.id]) {

      productStats[item.id] = {
        name: item.name,
        quantity: 0,
      };

    }

    productStats[item.id].quantity += item.quantity;

  });

});

const topProducts = Object.values(productStats)
  .sort((a, b) => b.quantity - a.quantity)
  .slice(0, 5);

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Estadísticas
        </h1>

        <p className="mt-2 text-zinc-400">
          Resumen general del negocio.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

        <StatCard
          title="Hoy"
          value={`$${todayIncome.toLocaleString()}`}
          color="text-green-400"
        />

        <StatCard
          title="Semana"
          value={`$${weekIncome.toLocaleString()}`}
          color="text-blue-400"
        />

        <StatCard
          title="Mes"
          value={`$${monthIncome.toLocaleString()}`}
          color="text-amber-300"
        />

        <StatCard
          title="Ticket Promedio"
          value={`$${Math.round(averageTicket).toLocaleString()}`}
          color="text-purple-400"
        />

      </div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    🏆 Productos más vendidos
  </h2>

  {topProducts.length === 0 ? (

    <p className="text-zinc-500">
      Todavía no hay ventas suficientes.
    </p>

  ) : (

    <div className="space-y-4">

      {topProducts.map((product, index) => (

        <div
          key={product.name}
          className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
        >

          <div className="flex items-center gap-4">

            <span className="text-xl font-bold text-amber-200">
              #{index + 1}
            </span>

            <span className="font-semibold">
              {product.name}
            </span>

          </div>

          <span className="font-bold">
            {product.quantity} vendidos
          </span>

        </div>

      ))}

    </div>

  )}

</div>
    </div>
  );
}