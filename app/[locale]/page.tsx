"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function StartPage() {
  const t = useTranslations("start");
  const f = useTranslations("footer");
  const locale = useLocale();
  const otherLocale = locale === "fr" ? "en" : "fr";

  const cards = [
    { key: "ugc", href: `/${locale}/ugc`, icon: <PlayIcon /> },
    { key: "dev", href: `/${locale}/dev`, icon: <CodeIcon /> },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between px-6 py-6">
        <Image
          src="/logo/skaleflow-logo-white.png"
          alt="SkaleFlow"
          width={140}
          height={40}
          priority
        />
        <Link
          href={`/${otherLocale}`}
          className="text-sm text-text-muted hover:text-text transition-colors uppercase"
        >
          {otherLocale}
        </Link>
      </header>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12"
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight"
        >
          {t("title")}
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-lg text-text-muted max-w-xl">
          {t("subtitle")}
        </motion.p>

        <div className="mt-14 grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {cards.map((card) => (
            <motion.div key={card.key} variants={item} className="h-full">
              <Link
                href={card.href}
                className="group h-full rounded-2xl p-8 flex flex-col items-start text-left bg-surface border border-white/5 hover:border-primary transition-colors"
              >
                <span className="mb-6 w-12 h-12 rounded-full bg-bg flex items-center justify-center text-primary">
                  {card.icon}
                </span>
                <h2 className="text-2xl font-bold mb-3">{t(`${card.key}.title`)}</h2>
                <p className="text-text-muted leading-relaxed mb-8 flex-1">
                  {t(`${card.key}.description`)}
                </p>
                <span className="text-primary font-medium">
                  {t(`${card.key}.cta`)}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <span>
            © {new Date().getFullYear()} SkaleFlow. {f("rights")}
          </span>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-text transition-colors">
              {f("privacyLink")}
            </Link>
            <Link href={`/${locale}/legal`} className="hover:text-text transition-colors">
              {f("legalLink")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M10 9l5 3-5 3z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M13.5 6l-3 12" />
    </svg>
  );
}