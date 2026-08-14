import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Check,
  X,
  Eye,
} from "lucide-react";

import {
  getWholesaleRequests,
  approveWholesaleRequest,
  rejectWholesaleRequest,
} from "../services/wholesaleService";

export default function WholesaleRequests() {

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [selectedRequest, setSelectedRequest] =
  useState(null);

  async function loadRequests() {

    try {

      const data =
        await getWholesaleRequests();

      setRequests(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadRequests();

  }, []);

  async function approve(id) {

    await approveWholesaleRequest(id);

    loadRequests();

  }

  async function reject(id) {

    await rejectWholesaleRequest(id);

    loadRequests();

  }

const filtered = useMemo(() => {

  return requests.filter((request) => {

    const value = search.toLowerCase();

    const matchesSearch =

      request.full_name?.toLowerCase().includes(value) ||

      request.email?.toLowerCase().includes(value) ||

      request.business_name?.toLowerCase().includes(value);

    const matchesFilter =

      filter === "all"

        ? true

        : request.status === filter;

    return matchesSearch && matchesFilter;

  });

}, [requests, search, filter]);

  const pending =
    requests.filter(r => r.status === "pending").length;

  const approved =
    requests.filter(r => r.status === "approved").length;

  const rejected =
    requests.filter(r => r.status === "rejected").length;

  if (loading) {

    return (

      <div className="p-8">

        Cargando...

      </div>

    );

  }

  return (

    <main className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">

            Solicitudes Mayoristas

          </h1>

          <p className="mt-2 text-zinc-400">

            Gestioná todas las solicitudes recibidas desde la tienda.

          </p>

        </div>

        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Buscar..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 outline-none focus:border-amber-200"
          />

        </div>

      </div>

      {/* RESUMEN */}

      <>
  <div className="grid gap-5 md:grid-cols-3">

    <div className="rounded-2xl border border-yellow-600/30 bg-yellow-500/10 p-6">

      <p className="text-sm uppercase tracking-widest text-yellow-400">

        Pendientes

      </p>

      <h2 className="mt-3 text-4xl font-bold">

        {pending}

      </h2>

    </div>

    <div className="rounded-2xl border border-green-600/30 bg-green-500/10 p-6">

      <p className="text-sm uppercase tracking-widest text-green-400">

        Aprobadas

      </p>

      <h2 className="mt-3 text-4xl font-bold">

        {approved}

      </h2>

    </div>

    <div className="rounded-2xl border border-red-600/30 bg-red-500/10 p-6">

      <p className="text-sm uppercase tracking-widest text-red-400">

        Rechazadas

      </p>

      <h2 className="mt-3 text-4xl font-bold">

        {rejected}

      </h2>

    </div>

  </div>

  <div className="mt-6 flex gap-3">

    {[
      ["all", "Todas"],
      ["pending", "Pendientes"],
      ["approved", "Aprobadas"],
      ["rejected", "Rechazadas"],
    ].map(([value, label]) => (

      <button
        key={value}
        onClick={() => setFilter(value)}
        className={`rounded-full px-5 py-2 transition ${
          filter === value
            ? "bg-amber-200 font-semibold text-black"
            : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
        }`}
      >
        {label}
      </button>

    ))}

  </div>
</>

      {/* TABLA */}

      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800 text-left text-sm uppercase tracking-wider text-zinc-500">

              <th className="px-6 py-5">

                Estado

              </th>

              <th>

                Cliente

              </th>

              <th>

                Negocio

              </th>

              <th>

                Email

              </th>

              <th>

  Teléfono

</th>

<th>

  Fecha

</th>

<th>

  Acciones

</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((request) => (

              <tr
                key={request.id}
                className="border-b border-zinc-800 hover:bg-zinc-800/40"
              >

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      request.status === "approved"
                        ? "bg-green-500/20 text-green-400"

                        : request.status === "rejected"

                        ? "bg-red-500/20 text-red-400"

                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >

                    {request.status}

                  </span>

                </td>

                <td>

                  <div>

                    <p className="font-semibold">

                      {request.full_name}

                    </p>

                    {request.message && (

                      <p className="mt-1 line-clamp-1 text-sm text-zinc-500">

                        {request.message}

                      </p>

                    )}

                  </div>

                </td>

                <td>

                  {request.business_name || "-"}

                </td>

                <td>

                  {request.email}

                </td>

                    <td>

  {request.phone}

</td>

<td>

  {new Date(
    request.created_at
  ).toLocaleDateString("es-AR")}

</td>

<td>

  <div className="flex gap-2">

    <button
      onClick={() =>
        setSelectedRequest(request)
      }
      className="rounded-lg bg-zinc-800 p-2 transition hover:bg-zinc-700"
      title="Ver solicitud"
    >

      <Eye size={18} />

    </button>

    {request.status === "pending" && (

      <>
        <button
          onClick={() => {

            if (
              window.confirm(
                "¿Aprobar esta solicitud?"
              )
            ) {

              approve(request.id);

            }

          }}
          className="rounded-lg bg-green-600 p-2 transition hover:bg-green-700"
          title="Aprobar"
        >

          <Check size={18} />

        </button>

        <button
          onClick={() => {

            if (
              window.confirm(
                "¿Rechazar esta solicitud?"
              )
            ) {

              reject(request.id);

            }

          }}
          className="rounded-lg bg-red-600 p-2 transition hover:bg-red-700"
          title="Rechazar"
        >

          <X size={18} />

        </button>

      </>

    )}

  </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedRequest && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">

                Solicitud Mayorista

              </h2>

              <button
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="text-3xl text-zinc-400 transition hover:text-white"
              >

                ×

              </button>

            </div>

            <div className="mt-8 grid gap-6">

              <div>

                <p className="text-sm uppercase tracking-widest text-zinc-500">

                  Cliente

                </p>

                <p className="mt-1 text-lg font-semibold">

                  {selectedRequest.full_name}

                </p>

              </div>

              <div>

                <p className="text-sm uppercase tracking-widest text-zinc-500">

                  Negocio

                </p>

                <p className="mt-1">

                  {selectedRequest.business_name || "-"}

                </p>

              </div>

              <div>

                <p className="text-sm uppercase tracking-widest text-zinc-500">

                  Email

                </p>

                <p className="mt-1">

                  {selectedRequest.email}

                </p>

              </div>

              <div>

                <p className="text-sm uppercase tracking-widest text-zinc-500">

                  Teléfono

                </p>

                <p className="mt-1">

                  {selectedRequest.phone}

                </p>

              </div>

              <div>

                <p className="text-sm uppercase tracking-widest text-zinc-500">

                  Fecha

                </p>

                <p className="mt-1">

                  {new Date(
                    selectedRequest.created_at
                  ).toLocaleString("es-AR")}

                </p>

              </div>

              <div>

                <p className="text-sm uppercase tracking-widest text-zinc-500">

                  Mensaje

                </p>

                <div className="mt-2 rounded-2xl bg-zinc-800 p-5 leading-7 text-zinc-300">

                  {selectedRequest.message || "Sin mensaje."}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}