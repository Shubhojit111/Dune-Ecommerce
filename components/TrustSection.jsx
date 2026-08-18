import { Sprout, Recycle, Globe } from "lucide-react";
import HeaderBtn from "./buttons/HeaderBtn";
import SubTextBtn from "./buttons/SubTextBtn";

const DEFAULT_FEATURES = [
  {
    id: "fair-trade",
    icon: Sprout,
    title: "FAIR TRADE",
    description: "We proudly partner with Fair Trade Certified cotton and wool Factories.",
  },
  {
    id: "recycled",
    icon: Recycle,
    title: "100% RECYCLED",
    description: "Our textiles are made of 100% recycled materials.",
  },
  {
    id: "less-water",
    icon: Globe,
    title: "81% LESS",
    description: "Our organic cotton uses 81% LESS water than conventional cotton.",
  },
];

export default function TrustSection({ features = DEFAULT_FEATURES }) {
  return (
    <section className="w-full bg-[#F5F4F2] px-4 sm:px-8 lg:px-14 py-16 md:py-10">
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <Icon
                size={56}
                strokeWidth={1}
                className="text-ink/20 mb-5"
              />
              <HeaderBtn title={feature.title} className="!text-[34px]" />
              <SubTextBtn text={feature.description} className="!text-ink/80 !text-[12px]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}