import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppProviders from "./context/AppProviders";

import StoreLayout from "./store/layouts/StoreLayout";
import StoreHome from "./store/StoreHome";
import ProductsPage from "./store/ProductsPage";
import ProductPage from "./store/ProductPage";
import CategoryPage from "./store/CategoryPage";
import AboutPage from "./store/AboutPage";
import ContactPage from "./store/ContactPage";
import CartPage from "./store/CartPage";
import CheckoutPage from "./store/CheckoutPage";
import LoginPage from "./store/LoginPage";
import FaqPage from "./store/FaqPage";
import AccountPage from "./store/AccountPage";
import OrderSuccessPage from "./store/OrderSuccessPage";
import OrderDetailsPage from "./store/OrderDetailsPage";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import NewSale from "./admin/NewSale";
import Providers from "./admin/Providers";
import Purchases from "./admin/Purchases";
import Sales from "./admin/Sales";
import Statistics from "./admin/Statistics";
import StoreOrders from "./admin/StoreOrders";
import WholesaleRequests from "./admin/WholesaleRequests";

import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import StoreEditor from "./admin/StoreEditor";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>

          {/* ================= TIENDA ================= */}

          <Route path="/" element={<StoreLayout />}>

            <Route index element={<StoreHome />} />

            <Route
              path="productos"
              element={<ProductsPage />}
            />

            <Route
              path="categoria/:slug"
              element={<CategoryPage />}
            />

            <Route
              path="producto/:id"
              element={<ProductPage />}
            />

            <Route
              path="nosotros"
              element={<AboutPage />}
            />

            <Route
              path="contacto"
              element={<ContactPage />}
            />

            <Route
              path="carrito"
              element={<CartPage />}
            />

            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="pedido-realizado"
              element={<OrderSuccessPage />}
            />

            <Route
              path="pedido/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="mi-cuenta"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />

            {/* AUTENTICACIÓN */}

            <Route
              path="login"
              element={<LoginPage />}
            />

            <Route
              path="registro"
              element={<LoginPage />}
            />

            <Route
              path="faq"
              element={<FaqPage />}
            />

          </Route>

          {/* ================= PANEL ADMIN ================= */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="products"
              element={<Products />}
            />

            <Route
              path="orders"
              element={<NewSale />}
            />

            <Route
              path="providers"
              element={<Providers />}
            />

            <Route
              path="purchases"
              element={<Purchases />}
            />

            <Route
              path="sales"
              element={<Sales />}
            />

            <Route
              path="statistics"
              element={<Statistics />}
            />

            <Route
              path="store-orders"
              element={<StoreOrders />}
            />

            <Route
              path="wholesale"
              element={<WholesaleRequests />}
            />

            <Route
              path="store-editor"
              element={<StoreEditor />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;