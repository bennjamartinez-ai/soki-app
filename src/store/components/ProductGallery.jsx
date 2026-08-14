export default function ProductGallery({
  images,
  selectedImage,
  setSelectedImage,
  product,
}) {
  return (
    <>
      {/* MINIATURAS */}

      <aside className="sticky top-8 h-fit">

        <div className="flex flex-col gap-3">

          {images.map((image, index) => (

            <button
              key={index}
              onClick={() =>
                setSelectedImage(index)
              }
              className={`overflow-hidden rounded-2xl transition-all duration-200 ${
                selectedImage === index
                  ? "ring-2 ring-black"
                  : "hover:scale-[1.03] hover:shadow-md"
              }`}
            >

              <img
                src={image}
                alt=""
                className="aspect-square w-full bg-[#f5f5f5] object-cover"
              />

            </button>

          ))}

        </div>

      </aside>

      {/* IMAGEN */}

      <section className="sticky top-0 h-screen">

        <div className="flex h-full items-center justify-center rounded-3xl bg-[#f5f5f5]">

          {images.length > 0 ? (

            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-h-[96vh] max-w-[92%] object-contain transition-transform duration-500 hover:scale-[1.04]"
            />

          ) : (

            <div className="text-zinc-400">
              Imagen próximamente
            </div>

          )}

        </div>

      </section>
    </>
  );
}