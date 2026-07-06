import { BrowserRouter, Routes, Route } from "react-router-dom";
import Providers from "./pages/Providers";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import Statistics from "./pages/Statistics";
import { InventoryProvider } from "./context/InventoryContext";

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>

        <div className="flex min-h-screen bg-zinc-950 text-white">

          <Sidebar />

          <main className="flex-1 p-8">

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />
<Route
  path="/providers"
  element={<Providers />}
/>
              <Route
                path="/purchases"
                element={<Purchases />}
             />

              <Route
                path="/sales"
                element={<Sales />}
              />

              <Route
                path="/statistics"
                element={<Statistics />}
              />

          
            </Routes>

          </main>

        </div>

      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;