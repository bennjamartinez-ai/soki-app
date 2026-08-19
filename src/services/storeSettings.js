import { supabase } from "../lib/supabase";

export async function getStoreSettings() {
  const { data, error } = await supabase
    .from("store_settings")
    .select("*");

  if (error) throw error;

  return data.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}

export async function updateStoreSetting(
  key,
  value
) {
  const { error } = await supabase
    .from("store_settings")
    .upsert({
      key,
      value,
    });

  if (error) throw error;

  return true;
}