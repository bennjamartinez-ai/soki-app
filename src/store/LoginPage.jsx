import { useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function LoginPage() {

  const {
    user,
    login,
    register,
    loading,
  } = useAuth();

  const [isRegister, setIsRegister] =
    useState(false);

  const [form, setForm] = useState({

    full_name: "",

    email: "",

    password: "",

  });

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  function handleChange(e) {

    setForm((prev) => ({

      ...prev,

      [e.target.name]:
        e.target.value,

    }));

  }

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setSuccess("");

    try {

      setSubmitting(true);

      if (isRegister) {

        await register({

          full_name: form.full_name,

          email: form.email,

          password: form.password,

        });

        setSuccess(
          "Cuenta creada correctamente. Revisá tu correo para confirmar el registro."
        );

      } else {

        await login(

          form.email,

          form.password

        );

      }

    } catch (err) {

      setError(

        err.message ??

        "Ocurrió un error."

      );

    } finally {

      setSubmitting(false);

    }

  }

  if (!loading && user) {

    return <Navigate to="/" replace />;

  }

  return (

    <section className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-6">

      <div className="w-full rounded-[40px] bg-white p-12 shadow-sm">

        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-soki-surface">

          <User
            size={36}
            className="text-soki-dark"
          />

        </div>

        <h1 className="text-center font-display text-5xl text-soki-dark">

          {isRegister
            ? "Crear cuenta"
            : "Iniciar sesión"}

        </h1>

        <p className="mt-4 text-center text-soki-muted">

          {isRegister
            ? "Registrate para comenzar a comprar."
            : "Ingresá con tu cuenta Soki."}

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >

          {isRegister && (

            <input

              name="full_name"

              value={form.full_name}

              onChange={handleChange}

              placeholder="Nombre completo"

              className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none focus:border-soki-dark"

            />

          )}

          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            placeholder="Correo electrónico"

            className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none focus:border-soki-dark"

          />

          <input

            type="password"

            name="password"

            value={form.password}

            onChange={handleChange}

            placeholder="Contraseña"

            className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none focus:border-soki-dark"

          />

          {error && (

            <div className="rounded-2xl bg-red-50 p-4 text-red-600">

              {error}

            </div>

          )}

          {success && (

            <div className="rounded-2xl bg-green-50 p-4 text-green-700">

              {success}

            </div>

          )}

          <button

            disabled={submitting}

            className="w-full rounded-full bg-soki-dark py-4 font-semibold text-white transition hover:bg-black disabled:opacity-60"

          >

            {submitting

              ? "Procesando..."

              : isRegister

              ? "Crear cuenta"

              : "Ingresar"}

          </button>

        </form>

        <button

          onClick={() => {

            setIsRegister(

              !isRegister

            );

            setError("");

            setSuccess("");

          }}

          className="mt-8 w-full text-center font-semibold text-soki-brown hover:underline"

        >

          {isRegister

            ? "¿Ya tenés una cuenta? Iniciá sesión"

            : "¿No tenés cuenta? Registrate"}

        </button>

      </div>

    </section>

  );

}