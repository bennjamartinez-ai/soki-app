import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  House,
  LayoutGrid,
  Package,
  Image,
  Camera,
  Newspaper,
  PanelBottom,
} from "lucide-react";

import HeroEditor from "./components/store-editor/HeroEditor";
import StoreSectionsEditor from "./components/StoreSectionsEditor";
import BenefitsEditor from "./components/store-editor/BenefitsEditor";
import BannerEditor from "./components/store-editor/BannerEditor";
import NewsletterEditor from "./components/store-editor/NewsletterEditor";
import FooterEditor from "./components/store-editor/FooterEditor";

const pages = [
  {
    id: "hero",
    icon: House,
    name: "Hero",
    component: HeroEditor,
  },
  {
    id: "benefits",
    icon: LayoutGrid,
    name: "Beneficios",
    component: BenefitsEditor,
  },
  {
    id: "sections",
    icon: Package,
    name: "Secciones de productos",
    component: StoreSectionsEditor,
  },
  {
    id: "banner",
    icon: Image,
    name: "Banner promocional",
    component: BannerEditor,
  },
  {
    id: "instagram",
    icon: Camera,
    name: "Instagram",
    component: null,
  },
  {
  id: "newsletter",
  icon: Newspaper,
  name: "Newsletter",
  component: NewsletterEditor,
},
  {
    id: "footer",
    icon: PanelBottom,
    name: "Footer",
    component: FooterEditor,
  },
];

export default function StoreEditor() {
  const [page, setPage] = useState(null);

  if (page) {
    const current = pages.find(
      (item) => item.id === page
    );

    const Editor = current?.component;

    return (
      <div className="space-y-8">

        <button
          onClick={() => setPage(null)}
          className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ChevronLeft size={18} />
          Volver al Editor
        </button>

        {Editor ? (
          <Editor />
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10">

            <h2 className="text-2xl font-bold">
              {current.name}
            </h2>

            <p className="mt-3 text-zinc-400">
              Próximamente.
            </p>

          </div>
        )}

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Editor de Tienda
        </h1>

        <p className="mt-2 text-zinc-400">
          Administrá todo el contenido visible de la tienda.
        </p>

      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

        {pages.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.id}
              onClick={() =>
                setPage(item.id)
              }
              className="flex w-full items-center justify-between border-b border-zinc-800 px-6 py-5 transition last:border-none hover:bg-zinc-800"
            >

              <div className="flex items-center gap-4">

                <Icon
                  size={20}
                  className="text-amber-200"
                />

                <span className="font-medium">
                  {item.name}
                </span>

              </div>

              <ChevronRight
                size={18}
                className="text-zinc-500"
              />

            </button>

          );

        })}

      </div>

    </div>
  );
}