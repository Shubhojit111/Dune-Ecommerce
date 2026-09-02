import Link from "next/link";

export default function TextPromo({ heading, body, ctaLabel, href }) {
  return (
    <section className="bg-sand/40 px-6 py-16 text-center">
      <h2 className="font-dune text-2xl md:text-3xl">{heading}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink/70">{body}</p>
      <Link
        href={href}
        className="mt-6 inline-block border-b border-ink pb-1 text-sm uppercase tracking-widest2 hover:text-camel hover:border-camel transition"
      >
        {ctaLabel}
      </Link>
    </section>
  );
}
