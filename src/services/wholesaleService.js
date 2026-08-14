import { supabase } from "../lib/supabase";

/* ===========================
   OBTENER SOLICITUDES
=========================== */

export async function getWholesaleRequests() {
  const { data, error } = await supabase
    .from("wholesale_requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   CREAR SOLICITUD
=========================== */

export async function createWholesaleRequest(request) {
  const { data, error } = await supabase
    .from("wholesale_requests")
    .insert([request])
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* ===========================
   APROBAR
=========================== */

export async function approveWholesaleRequest(id) {

  /* ===========================
     BUSCAR SOLICITUD
  =========================== */

  const {

    data: request,

    error: requestError,

  } = await supabase

    .from("wholesale_requests")

    .select("*")

    .eq("id", id)

    .single();

  if (requestError) throw requestError;

  /* ===========================
     ACTUALIZAR PERFIL
  =========================== */

  const {

    error: profileError,

  } = await supabase

    .from("profiles")

    .update({

      role: "wholesale",

      business_name:
        request.business_name,

      phone:
        request.phone,

    })

    .eq("email", request.email);

  if (profileError) throw profileError;

  /* ===========================
     ACTUALIZAR SOLICITUD
  =========================== */

  const {

    data,

    error,

  } = await supabase

    .from("wholesale_requests")

    .update({

      status: "approved",

    })

    .eq("id", id)

    .select()

    .single();

  if (error) throw error;

  return data;

}

/* ===========================
   RECHAZAR
=========================== */

export async function rejectWholesaleRequest(
  id,
  notes = ""
) {
  const { data, error } = await supabase
    .from("wholesale_requests")
    .update({
      status: "rejected",
      notes,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* ===========================
   ELIMINAR
=========================== */

export async function deleteWholesaleRequest(id) {
  const { error } = await supabase
    .from("wholesale_requests")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}