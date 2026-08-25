import ProductDetailsPage from "@/components/ProductDetailsPage";
import FlagshipStoreSection from "@/components/FlagshipStoreSection";
import TestimonialSection from "@/components/TestimonialSection";
import JournalSection from "@/components/JournalSection";
import ProductGridSection from "@/components/ProductGridSection";
import { toquesProducts } from "@/data/products";
import ShopTheLook from "@/components/ShopTheLook";
import Assets from "@/assets/Assets";
import { TimeBannerFullScreen } from "@/components/TimeBannerFullScreen";
import FloatingCardSection from "@/components/FloatingCardSection";
import FloatingCardSectionSmall from "@/components/FloatingCardSectionSmall";
import TrustSection from "@/components/TrustSection";
import VideoSection from "@/components/VideoSection";

export default function ProductPage({ params }) {
  return (
    <div className="bg-[white]">
      <ProductDetailsPage />

      <ProductGridSection
        heading="More top picks"
        products={toquesProducts}
        centeredHeading={true}
        columns={3}
        itemsToShow={3}
        hasViewAllBtn={true}
      />

      <ShopTheLook heroImage={Assets.ShopTheLookBg} />

      <TrustSection />

      <VideoSection />

      <TimeBannerFullScreen />

      <ProductGridSection
        heading="Clearence"
        products={toquesProducts}
        centeredHeading={true}
        columns={4}
        itemsToShow={1}
        hasViewAllBtn={true}
      />

      <FloatingCardSectionSmall
        titleText="Designed for comfort."
        descriptionText={
          <>
            <p className="flex flex-col gap-3">
              <p>
                Above all else we design all our garments to be comfortable
                first and stylish second.
              </p>
              <p>
                We believe no one should have to deal with fast fashion,
                scratchy fabrics, and poor fits.
              </p>
            </p>
          </>
        }
        bgImage={Assets.FloatingCardSection2}
      />

      <FlagshipStoreSection />

      <ProductGridSection
        heading="You may also like"
        products={toquesProducts}
        centeredHeading={true}
        columns={5}
        itemsToShow={5}
        hasViewAllBtn={true}
      />

      <FloatingCardSectionSmall
        titleText="Our retail store"
        descriptionText={
          <>
            <p className="flex flex-col gap-3">
              <p>
                301 Front St W <br /> Toronto, Canada
              </p>
              <p>
                Mon - Fri, 8:30am - 10:30pm <br />
                Saturday, 8:30am - 10:30pm <br />
                Sunday, 8:30am - 10:30pm
              </p>
            </p>
          </>
        }
        btnText="get directions"
        // btnHref="/collections/fall-2021"
        bgImage={Assets.GridImage1}
      />

      <TestimonialSection />
      <JournalSection />

      {/*
       */}
    </div>
  );
}
