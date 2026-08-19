export default function ProductGallery({
  images,
  selectedImage,
  setSelectedImage,
  product,
}) {
  return (
    <>
      {/* Desktop */}

      <aside className="sticky top-8 hidden h-fit lg:block">
        <div className="flex flex-col gap-3">

          {images.map((image, index) => (

            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-2xl transition-all duration-200 ${
                selectedImage === index
                  ? "ring-2 ring-black"
                  : "hover:scale-[1.03]"
              }`}
            >
              <img
                src={image}
                alt=""
                className="aspect-square w-full bg-zinc-100 object-cover"
              />
            </button>

          ))}

        </div>
      </aside>

      {/* Imagen */}

      <section className="lg:sticky lg:top-0 lg:h-screen">

        <div className="overflow-hidden rounded-2xl bg-zinc-100 lg:flex lg:h-full lg:items-center lg:justify-center lg:rounded-3xl">

          {images.length > 0 ? (

            <img
              src={images[selectedImage]}
              alt={product.name}
              className="aspect-square w-full object-cover lg:max-h-[96vh] lg:max-w-[92%] lg:object-contain"
            />

          ) : (

            <div className="flex aspect-square items-center justify-center text-zinc-400">
              Imagen próximamente
            </div>

          )}

        </div>

        {/* Miniaturas móviles */}

        {images.length > 1 && (

          <div className="mt-4 flex gap-3 overflow-x-auto lg:hidden">

            {images.map((image, index) => (

              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl ${
                  selectedImage === index
                    ? "ring-2 ring-black"
                    : ""
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>

            ))}

          </div>

        )}

      </section>
    </>
  );
}