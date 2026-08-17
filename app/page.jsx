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

export default function HomePage() {
  return (
    <>
      <Hero />

      <ProductGridSection
        heading="NEW ARRIVALS - TOQUES"
        products={toquesProducts}
        centeredHeading={true}
        columns={4}
        containerPadding="px-4 sm:px-8 lg:px-14"
        py="py-16 md:py-24"
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

      <ShopTheLook />
      <FloatingCardSection />

      <CategorySection
        heading="Shop Categories"
        categories={demoCategories}
        columns={4}
        itemsToShow={4}
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
        containerPadding="px-4 sm:px-8 lg:px-14"
        py="py-16 md:py-24"
        viewAllHref="/product"
        hasViewAllBtn="true"
      />

      <TimeBanner />
      <BottomGridSection />
    </>
  );
}
