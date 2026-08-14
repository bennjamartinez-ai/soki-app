import { supabase } from "../lib/supabase";

const TABLE = "favorites";

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("product_id")
    .eq("user_id", userId);

  if (error) throw error;

  return data ?? [];
}

export async function addFavorite(
  userId,
  productId
) {
  const { error } = await supabase
    .from(TABLE)
    .insert({
      user_id: userId,
      product_id: productId,
    });

  if (error) throw error;

  return true;
}

export async function removeFavorite(
  userId,
  productId
) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw error;

  return true;
}