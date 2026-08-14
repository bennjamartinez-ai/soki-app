import { supabase } from "../lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        id,
        image_url,
        position
      )
    `)
    .order("id");

  if (error) throw error;

  return (data ?? []).map((product) => {
    const images =
      product.product_images
        ?.sort((a, b) => a.position - b.position)
        .map((img) => img.image_url) ?? [];

    return {
      ...product,

      // Compatibilidad con la tienda actual
      image:
        images[0] ??
        product.image ??
        null,

      // Nueva galería
      images,
    };
  });
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}

export async function reloadProducts(setProducts) {
  const products = await getProducts();
  setProducts(products);
}