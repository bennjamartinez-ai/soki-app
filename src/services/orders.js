import { supabase } from "../lib/supabase";
import { createSale } from "./sales";

const TABLE = "orders";

export async function testOrdersConnection() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .limit(5);

  if (error) {
    console.error("❌ Error conectando con Supabase:", error);
    return null;
  }

  console.log("✅ Conexión correcta con Supabase");
  console.log(data);

  return data;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      order_items (*)
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function getOrdersByUser(userId) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      order_items (*)
    `)
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      order_items (*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getOrderByUser(id, userId) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      order_items (*)
    `)
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data;
}

export async function getOrderItems(orderId) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (error) throw error;

  return data;
}

export async function createOrder(order) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(order)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function createOrderItems(orderId, cart) {
  const items = cart.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: Number(item.price),
    subtotal: Number(item.price) * item.quantity,
  }));

  const { data, error } = await supabase
    .from("order_items")
    .insert(items)
    .select();

  if (error) throw error;

  return data;
}

export async function updateOrder(id, order) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(order)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function confirmOrderPayment(order) {
  if (order.sale_id) {
    return null;
  }

  console.log("➡️ Confirmando pedido", order);

  const sale = await createSale({
    subtotal: order.subtotal ?? order.total,
    shipping: order.shipping ?? 0,
    discount: order.discount ?? 0,
    total: order.total,
    status: "completed",
    items: order.order_items.map((item) => ({
      id: item.product_id,
      name: item.product_name,
      price: item.unit_price,
      quantity: item.quantity,
    })),
  });

  console.log("✅ Venta creada", sale);

  await updateOrder(order.id, {
    status: "paid",
    sale_id: sale.id,
  });

  console.log("✅ Pedido actualizado");

  return sale;
}