import { supabase } from "../lib/supabase";

const TABLE = "providers";

export async function getProviders() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function createProvider(provider) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(provider)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProvider(id, provider) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(provider)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProvider(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}