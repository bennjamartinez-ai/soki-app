import { supabase } from "../lib/supabase";

const TABLE = "sales";

export async function getSales() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      sale_items (*)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createSale(sale) {
  const {
    items = [],
    ...saleData
  } = sale;

  // Crear venta
  const {
    data: newSale,
    error: saleError,
  } = await supabase
    .from(TABLE)
    .insert(saleData)
    .select()
    .single();

  if (saleError) throw saleError;

  // No hay productos
  if (items.length === 0) {
    return newSale;
  }

  // Crear sale_items
  const saleItems = items.map((item) => ({
    sale_id: newSale.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: Number(item.price),
    subtotal: Number(item.price) * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("sale_items")
    .insert(saleItems);

  if (itemsError) throw itemsError;

  // Actualizar stock
  for (const item of items) {
    const {
      data: product,
      error: productError,
    } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.id)
      .single();

    if (productError) throw productError;

    const { error: stockError } = await supabase
      .from("products")
      .update({
        stock: product.stock - item.quantity,
      })
      .eq("id", item.id);

    if (stockError) throw stockError;
  }

  return newSale;
}

export async function updateSale(id, sale) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(sale)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteSale(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}