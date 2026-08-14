import { supabase } from "../lib/supabase";

const TABLE = "categories";

export async function getCategories() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(category)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateCategory(id, category) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(category)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function swapCategoryOrder(
  first,
  second
) {

  const { error: error1 } = await supabase
    .from(TABLE)
    .update({
      display_order: second.display_order,
    })
    .eq("id", first.id);

  if (error1) throw error1;

  const { error: error2 } = await supabase
    .from(TABLE)
    .update({
      display_order: first.display_order,
    })
    .eq("id", second.id);

  if (error2) throw error2;

  return true;

}