import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";
import { CategoriesProvider } from "./CategoriesContext";
import { ProvidersProvider } from "./ProvidersContext";
import { OrdersProvider } from "./OrdersContext";
import { SalesProvider } from "./SalesContext";
import { FavoritesProvider } from "./FavoritesContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>

      <ProductsProvider>

        <CategoriesProvider>

          <ProvidersProvider>

            <OrdersProvider>

              <SalesProvider>

                  <CartProvider>

                    <FavoritesProvider>

                      {children}

                    </FavoritesProvider>

                  </CartProvider>

                </SalesProvider>

            </OrdersProvider>

          </ProvidersProvider>

        </CategoriesProvider>

      </ProductsProvider>

    </AuthProvider>
  );
}