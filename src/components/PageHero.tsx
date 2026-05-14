import Link from "next/link";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
};

export function PageHero({ eyebrow = "BabyMap", title, description, cta }: PageHeroProps) {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold text-primary">{eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
          {cta ? (
            <Link
              href={cta.href}
              className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm"
            >
              {cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
