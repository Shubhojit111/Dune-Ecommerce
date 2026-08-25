import Hero from "@/components/Hero";
import ProductGridSection from "@/components/ProductGridSection";
import FullBleedSplit from "@/components/FullBleedSplit";
import CategorySection from "@/components/CategorySection";
import FeaturedMultiSection from "@/components/FeaturedMultiSection";
import { demoCategories, toquesProducts } from "@/data/products";
import { TimeBanner } from "@/components/TimeBanner";
import Abc from "@/components/ShopTheLook";
import PanelSection from "@/components/PanelSection";
import BigScreen from "@/components/BigScreen";
import BottomGridSection from "@/components/BottomGridSection";
import ShopTheLook from "@/components/ShopTheLook";
import FloatingCardSection from "@/components/FloatingCardSection";
import BrandSection from "@/components/BrandSection";
import Assets from "@/assets/Assets";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ProductGridSection
        heading="NEW ARRIVALS - TOQUES"
        products={toquesProducts}
        centeredHeading={true}
        columns={4}
        itemsToShow={4}
        hasViewAllBtn={false}
      />
      <BigScreen />

      <FullBleedSplit />

      <CategorySection
        heading="Shop By Category"
        categories={demoCategories}
        columns={3}
        itemsToShow={3}
        hasViewAllBtn={false}
        // viewAllHref="/collections/all"
        // viewAllBtnText="VIEW ALL"
      />

      <FeaturedMultiSection />

      <BrandSection />

      <ShopTheLook heroImage={Assets.ShopTheLook} />
      <FloatingCardSection
        bgImage={Assets.FloatingCardSection}
        headerbtnText="Timeless Craftsmanship"
        titleText="WILDWOOD ESSENTIALS"
        descriptionText="Fierce elegance is about authenticity, refinement, and grace. It's a powerful presence with sophisticated style that creates a commanding aesthetic. Our Wildwood collection embodies timeless craftsmanship and modern sensibility."
        btnText="EXPLORE COLLECTION"
      />

      <CategorySection
        heading="Shop Categories"
        categories={demoCategories}
        columns={3}
        itemsToShow={3}
        hasViewAllBtn={false}
        // viewAllHref="/collections/all"
        // viewAllBtnText="VIEW ALL"
      />

      <PanelSection />

      <ProductGridSection
        heading="Shop Sweatshirts"
        products={toquesProducts}
        centeredHeading={true}
        columns={4}
        itemsToShow={4}
        viewAllHref="/product"
        hasViewAllBtn={true}
      />

      <TimeBanner />
      <BottomGridSection />
    </>
  );
}
