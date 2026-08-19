import {
  Truck,
  CreditCard,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { useStoreSettings } from "../../context/StoreSettingsContext";

export default function Benefits() {
  const { settings } = useStoreSettings();

  const benefits = [
    {
      icon: Truck,
      title: settings.benefit_1_title,
      text: settings.benefit_1_description,
    },
    {
      icon: CreditCard,
      title: settings.benefit_2_title,
      text: settings.benefit_2_description,
    },
    {
      icon: ShieldCheck,
      title: settings.benefit_3_title,
      text: settings.benefit_3_description,
    },
    {
      icon: RotateCcw,
      title: settings.benefit_4_title,
      text: settings.benefit_4_description,
    },
  ];

  return (
    <section className="border-y border-zinc-200 bg-white">

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-12">

        {benefits.map((benefit, index) => {

          const Icon = benefit.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">

                <Icon
                  size={26}
                  className="text-zinc-800"
                />

              </div>

              <h3 className="font-semibold text-zinc-900">
                {benefit.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {benefit.text}
              </p>

            </div>
          );

        })}

      </div>

    </section>
  );
}