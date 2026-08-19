import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext";
import { CategoriesProvider } from "./CategoriesContext";
import { StoreProvider } from "./StoreContext";
import { StoreSettingsProvider } from "./StoreSettingsContext";
import { ProvidersProvider } from "./ProvidersContext";
import { OrdersProvider } from "./OrdersContext";
import { SalesProvider } from "./SalesContext";
import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesContext";

export default function AppProviders({
  children,
}) {
  return (
    <AuthProvider>

      <ProductsProvider>

        <CategoriesProvider>

          <StoreProvider>

            <StoreSettingsProvider>

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

            </StoreSettingsProvider>

          </StoreProvider>

        </CategoriesProvider>

      </ProductsProvider>

    </AuthProvider>
  );
}