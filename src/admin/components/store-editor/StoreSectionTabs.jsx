export default function StoreSectionTabs({
  sections,
  section,
  setSelectedSection,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {sections.map((item) => (

        <button
          key={item.id}
          onClick={() =>
            setSelectedSection(item.id)
          }
          className={`rounded-xl px-5 py-3 transition ${
            section?.id === item.id
              ? "bg-amber-200 font-semibold text-black"
              : "bg-zinc-900 hover:bg-zinc-800"
          }`}
        >
          {item.title}
        </button>

      ))}

    </div>
  );
}