import { supabase } from "../lib/supabase";

export async function getStoreSections() {
  const { data, error } = await supabase
    .from("store_sections")
    .select(`
      *,
      store_section_products (
        id,
        display_order,
        product_id,
        products (
          id,
          name,
          image,
          price,
          stock,
          category
        )
      )
    `)
    .order("display_order");

  if (error) throw error;

  return data ?? [];
}

export async function updateStoreSectionProducts(
  sectionId,
  products
) {
  const { error: deleteError } = await supabase
    .from("store_section_products")
    .delete()
    .eq("section_id", sectionId);

  if (deleteError) throw deleteError;

  if (products.length === 0) return true;

  const rows = products.map((productId, index) => ({
    section_id: sectionId,
    product_id: productId,
    display_order: index + 1,
  }));

  const { error } = await supabase
    .from("store_section_products")
    .insert(rows);

  if (error) throw error;

  return true;
}