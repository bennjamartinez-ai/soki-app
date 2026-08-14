import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

export default function AccountProfile() {
  const {
    profile,
    user,
    updateProfile,
  } = useAuth();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });

  useEffect(() => {
    setForm({
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      city: profile?.city || "",
      postal_code: profile?.postal_code || "",
    });
  }, [profile]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateProfile(form);

      toast.success("Perfil actualizado.");
    } catch (error) {
      console.error(error);

      toast.error(
        "No se pudo actualizar el perfil."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold">
        Mi Perfil
      </h2>

      <p className="mt-3 text-zinc-500">
        Administrá la información de tu cuenta.
      </p>

      <div className="mt-10 space-y-6">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Nombre completo
          </label>

          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Correo electrónico
          </label>

          <input
            value={user?.email || ""}
            disabled
            className="w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Teléfono
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Dirección
          </label>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Ciudad
            </label>

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Código Postal
            </label>

            <input
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
            />

          </div>

        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {saving
            ? "Guardando..."
            : "Guardar cambios"}

        </button>

      </div>
    </>
  );
}