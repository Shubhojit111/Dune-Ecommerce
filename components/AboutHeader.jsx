import Assets from "@/assets/Assets";
import HeaderBtn from "./buttons/HeaderBtn";

const AboutHeader = () => {
  return (
    <section className="relative w-full h-[80vh] mt-[120px] sm:mt-36 md:mt-44 pb-6 lg:pb-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src={Assets.AboutHeaderVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <HeaderBtn text="Premium, Canadian." className="!text-white !text-[80px]" />
        <p className="mt-8 text-white/90 text-[14.5px] font-bold tracking-wider">
          Estd. 1994
        </p>
      </div>
    </section>
  );
};

export default AboutHeader;
