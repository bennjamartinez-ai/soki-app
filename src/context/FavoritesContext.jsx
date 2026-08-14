import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favorites";

const FavoritesContext = createContext();

export function FavoritesProvider({
  children,
}) {
  const { user } = useAuth();

  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    loadFavorites();
  }, [user]);

  async function loadFavorites() {
    const data = await getFavorites(user.id);

    setFavorites(
      data.map((item) => item.product_id)
    );
  }

  async function toggleFavorite(
    productId
  ) {
    if (!user) return;

    const exists =
      favorites.includes(productId);

    if (exists) {
      await removeFavorite(
        user.id,
        productId
      );

      setFavorites((current) =>
        current.filter(
          (id) => id !== productId
        )
      );
    } else {
      await addFavorite(
        user.id,
        productId
      );

      setFavorites((current) => [
        ...current,
        productId,
      ]);
    }
  }

  function isFavorite(productId) {
    return favorites.includes(productId);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}