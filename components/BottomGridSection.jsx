import Image from "next/image";
import Assets from "@/assets/images/Assets";

const galleryImages = [
  {
    src: Assets.GridImage1,
    alt: "Model wearing winter scarf and black toque",
  },
  {
    src: Assets.GridImage2,
    alt: "Layered knitwear and yellow plaid jacket detail",
  },
  {
    src: Assets.GridImage3,
    alt: "Stack of folded textured sweaters",
  },
  {
    src: Assets.GridImage4,
    alt: "Stack of folded textured sweaters",
  },
  {
    src: Assets.GridImage5,
    alt: "Stack of folded textured sweaters",
  },
  {
    src: Assets.GridImage6,
    alt: "Stack of folded textured sweaters",
  },
];

export default function BottomGridSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 lg:px-14 mt-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square w-full overflow-hidden bg-[#e5e2dc] md:h-[460px] md:aspect-auto"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
