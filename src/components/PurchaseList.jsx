export default function PurchaseList({
  purchase,
  setPurchase,
}) {

  const items = purchase.items;
function updateQuantity(id, quantity) {
  setPurchase((prev) => ({
    ...prev,
    items: prev.items.map((item) =>
      item.id === id
        ? { ...item, quantity }
        : item
    ),
  }));
}

function updateCost(id, cost) {
  setPurchase((prev) => ({
    ...prev,
    items: prev.items.map((item) =>
      item.id === id
        ? { ...item, cost }
        : item
    ),
  }));
}

function removeItem(id) {
  setPurchase((prev) => ({
    ...prev,
    items: prev.items.filter(
      (item) => item.id !== id
    ),
  }));
}
  return (
<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">
      <h2 className="mb-4 text-xl font-bold md:mb-5 md:text-2xl">
        Pedido
      </h2>

      {items.length === 0 ? (

        <p className="text-zinc-500">
          Todavía no agregaste productos.
        </p>

      ) : (

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800 text-zinc-400">

              <th className="pb-3 text-left">
                Producto
              </th>

              <th className="pb-3">
                Cantidad
              </th>

              <th className="pb-3">
                Costo
              </th>

              <th className="pb-3">
                Subtotal
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr
                key={item.id}
                className="border-b border-zinc-800"
              >

                <td className="py-3">
                  {item.name}
                </td>

                <td className="text-center">

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        Number(e.target.value)
                      )
                    }
<<<<<<< HEAD
                className="w-16 rounded-lg bg-zinc-800 p-2 text-center text-sm md:w-20"                  />
=======
className="w-16 rounded-lg bg-zinc-800 p-2 text-center text-sm md:w-20"                  />
>>>>>>> 35f281c4749e694493b0e8997178c8a897ea114f

                </td>

                <td className="text-center">

                  <input
                    type="number"
                    value={item.cost}
                    onChange={(e) =>
                      updateCost(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 rounded-lg bg-zinc-800 p-2 text-center text-sm md:w-24"                   />

                </td>

                <td className="text-center font-semibold">

                  $
                  {(item.quantity * item.cost).toLocaleString()}

                </td>

                <td className="text-right">

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    🗑
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

         </table>

      )}

    </div>
  );
}