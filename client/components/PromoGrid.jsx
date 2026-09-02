import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    id: "elevated-comfort",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Editorial%20fashion%20photography%2C%20woman%20with%20long%20copper%20red%20hair%20wearing%20an%20oversized%20soft%20taupe%20beige%20cashmere%20sweater%2C%20sitting%20on%20the%20floor%20with%20knees%20up%2C%20leaning%20forward%20smiling%2C%20solid%20warm%20mustard%20yellow%20studio%20background%2C%20natural%20window%20lighting%2C%20high%20end%20fashion%20editorial%20style&image_size=portrait_4_3",
    heading: "ELEVATED COMFORT",
    eyebrow: null,
    body: null,
    cta: "EXPLORE",
    href: "/collections/elevated-comfort",
    align: "bottom-left",
  },
  {
    id: "premium-flannel",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20fashion%20product%20photography%2C%20neatly%20folded%20red%20yellow%20and%20black%20plaid%20flannel%20shirt%20stack%20with%20label%20showing%2C%20floating%20cotton%20balls%20and%20gray%20stone%20shards%20and%20wood%20pieces%20around%2C%20warm%20taupe%20gray%20studio%20background%2C%20editorial%20ecommerce%20style&image_size=portrait_4_3",
    heading: "PREMIUM FLANNEL",
    eyebrow: null,
    body: "Shop comfy winter essentials",
    cta: "SHOP NOW",
    href: "/collections/premium-flannel",
    align: "center",
  },
];

export default function PromoGrid() {
  return (
    <section className="bg-cream px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            href={tile.href}
            className="group relative block aspect-[4/5] w-full overflow-hidden"
          >
            <Image
              src={tile.image}
              alt={tile.heading}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {tile.align === "bottom-left" ? (
              <div className="absolute inset-0 flex flex-col items-start justify-end px-10 pb-10 text-cream">
                <h3 className="font-dune text-4xl md:text-5xl tracking-tight">
                  {tile.heading}
                </h3>
                <span className="mt-5 inline-block bg-ink hover:bg-ink/90 px-6 py-2.5 text-[11px] uppercase tracking-[0.28em] font-medium rounded-full transition">
                  {tile.cta}
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream">
                <h3 className="font-dune text-4xl md:text-5xl tracking-tight">
                  {tile.heading}
                </h3>
                {tile.body && (
                  <p className="mt-3 text-sm text-cream/90">{tile.body}</p>
                )}
                <span className="mt-5 inline-block bg-ink hover:bg-ink/90 px-6 py-2.5 text-[11px] uppercase tracking-[0.28em] font-medium rounded-full transition">
                  {tile.cta}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
