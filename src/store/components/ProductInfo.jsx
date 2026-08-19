export default function ProductInfo({
  product,
  images,
  selectedImage,
  setSelectedImage,
}) {
  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {product.category}
      </p>

      <h1 className="mt-2 text-3xl font-semibold leading-tight text-zinc-900 lg:text-[34px]">
        {product.name}
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        Producto unisex
      </p>

      <div className="mt-6 lg:mt-8">
        <p className="text-3xl font-semibold">
          ${Number(product.price).toLocaleString("es-AR")}
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Hasta 6 cuotas sin interés
        </p>

        <p className="mt-1 text-xs text-zinc-400">
          Precio sin impuestos nacionales $
          {Math.round(product.price * 0.82).toLocaleString("es-AR")}
        </p>
      </div>

      {images.length > 1 && (
        <div className="mt-8 hidden lg:block">

          <p className="mb-4 font-medium">
            Imágenes
          </p>

          <div className="flex gap-3">

            {images.map((image, index) => (

              <button
                key={index}
                onClick={() =>
                  setSelectedImage(index)
                }
                className={`overflow-hidden rounded-xl transition ${
                  selectedImage === index
                    ? "ring-2 ring-black"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-20 w-20 object-cover"
                />
              </button>

            ))}

          </div>

        </div>
      )}

      <div className="mt-8 lg:mt-10">

        {product.stock > 5 && (
          <p className="font-medium text-green-600">
            Disponible
          </p>
        )}

        {product.stock > 0 &&
          product.stock <= 5 && (
            <p className="font-medium text-amber-600">
              Solo quedan {product.stock} unidades
            </p>
          )}

        {product.stock === 0 && (
          <p className="font-medium text-red-600">
            Sin stock
          </p>
        )}

      </div>
    </>
  );
}