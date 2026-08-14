import StatCard from "../components/StatCard";
import { useProducts } from "../context/ProductsContext";
import { useSales } from "../context/SalesContext";
export default function Dashboard() {

const { products } = useProducts();
const { sales } = useSales();

  const completedSales = sales.filter(
  (sale) => sale.status !== "cancelled"
);

  const today = new Date();

  const day = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  console.log("Hoy:", today);
console.log("Lunes:", monday);
console.log("Domingo:", sunday);

  const weeklySales = completedSales.filter((sale) => {
    const date = new Date(sale.createdAt);
    return date >= monday && date <= sunday;
  });

  const weeklyIncome = weeklySales.reduce(
    (total, sale) => total + (sale.total ?? sale.subtotal ?? 0),
    0
  );

  const totalProducts = products.length;

  const lowStock = products.filter(
    (product) => product.stock <= 5
  ).length;

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Bienvenido al sistema de gestión de Soki.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
        <StatCard
          title="Ingresos semanales"
          value={`$${weeklyIncome.toLocaleString()}`}
          color="text-green-400"
        />

        <StatCard
          title="Ventas semanales"
          value={weeklySales.length}
          color="text-blue-400"
        />

        <StatCard
          title="Productos"
          value={totalProducts}
          color="text-white"
        />

        <StatCard
          title="Stock bajo"
          value={lowStock}
          color="text-red-400"
        />

      </div>

    </div>
  );
}