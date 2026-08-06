import Link from "next/link";

export default function JournalSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="eyebrow">Inside the journal</p>
      <h2 className="mt-2 font-dune text-2xl md:text-3xl">
        Explore styling ideas, seasonal notes, and content-rich stories that
        bring our collections to life.
      </h2>
      <Link
        href="/blogs/journal"
        className="mt-6 inline-block border-b border-ink pb-1 text-sm uppercase tracking-widest2 hover:text-camel hover:border-camel transition"
      >
        Read more
      </Link>
    </section>
  );
}
