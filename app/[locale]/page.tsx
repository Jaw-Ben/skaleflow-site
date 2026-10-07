"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Methode />
      <CTA />
      <Footer />
    </>
  );
}

function Hero() {
  const t = useTranslations("hero");

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20"
    >
      <motion.span
        variants={item}
        className="text-sm uppercase tracking-widest text-primary-light mb-4"
      >
        {t("badge")}
      </motion.span>

      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight"
      >
        {t("titleBefore")}{" "}
        <span className="text-primary-light">{t("titleHighlight")}</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 text-lg text-text-muted max-w-xl"
      >
        {t("description")}
      </motion.p>

      <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4">
        <a
          href="#contact"
          className="bg-primary hover:bg-primary-light text-text-inverted font-medium px-6 py-3 rounded-full transition-colors"
        >
          {t("ctaPrimary")}
        </a>
        <a
          href="#services"
          className="border border-white/10 hover:border-white/30 text-text font-medium px-6 py-3 rounded-full transition-colors"
        >
          {t("ctaSecondary")}
        </a>
      </motion.div>
    </motion.section>
  );
}

function About() {
  const t = useTranslations("about");

  return (
    <motion.section
      id="about"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-32"
    >
      <motion.div variants={item} className="text-center mb-12">
        <span className="text-sm uppercase tracking-widest text-primary-light">
          {t("badge")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">{t("title")}</h2>
      </motion.div>

      <motion.div variants={item} className="space-y-6 text-lg text-text-muted leading-relaxed text-center mb-12">
        <p className="text-xl md:text-2xl font-semibold text-text">
          {t("introBefore")}{" "}
          <span className="text-primary-light">{t("introHighlight")}</span>.
        </p>

        <p>{t("paragraph1")}</p>

        <p>{t("paragraph2")}</p>
      </motion.div>
    </motion.section>
  );
}

type Offer = {
  tier: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
};

function Services() {
  const t = useTranslations("services");
  const offers = t.raw("offers") as Offer[];

  return (
    <motion.section
      id="services"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-5xl mx-auto px-6 py-32"
    >
      <motion.div variants={item} className="text-center mb-16">
        <span className="text-sm uppercase tracking-widest text-primary-light">
          {t("badge")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">{t("title")}</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {offers.map((offer, i) => {
          const highlighted = i === 1;

          return (
            <motion.div
              key={offer.tier}
              variants={item}
              className={`rounded-2xl p-8 flex flex-col ${
                highlighted
                  ? "bg-surface border-2 border-primary relative"
                  : "bg-surface border border-white/5"
              }`}
            >
              {highlighted && (
                <span className="absolute -top-3 left-8 bg-primary text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  {t("recommendedBadge")}
                </span>
              )}

              <span className="text-sm uppercase tracking-widest text-primary-light mb-2">
                {offer.tier}
              </span>
              <h3 className="text-2xl font-bold mb-1">{offer.title}</h3>
              <span className="text-text-muted text-sm mb-6">{offer.price}</span>

              <p className="text-text-muted leading-relaxed mb-6">{offer.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className="text-primary-light mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`text-center font-medium px-6 py-3 rounded-full transition-colors ${
                  highlighted
                    ? "bg-primary hover:bg-primary-light text-white"
                    : "border border-white/10 hover:border-white/30 text-text"
                }`}
              >
                {offer.cta}
              </a>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

type Step = {
  number: string;
  title: string;
  description: string;
};

const SLIDE_DURATION = 5000;

function Methode() {
  const t = useTranslations("methode");
  const steps = t.raw("steps") as Step[];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [key, setKey] = useState(0);

  const goTo = (newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + steps.length) % steps.length);
    setKey((k) => k + 1);
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  useEffect(() => {
    const timer = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [key]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const step = steps[index];

  return (
    <motion.section
      id="methode"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-3xl mx-auto px-6 py-32"
    >
      <motion.div variants={item} className="text-center mb-16">
        <span className="text-sm uppercase tracking-widest text-primary-light">
          {t("badge")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">{t("title")}</h2>
      </motion.div>

      <motion.div variants={item} className="relative">
        <div className="flex gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.number} className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              {i === index && (
                <motion.div
                  key={key}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  className="h-full bg-primary"
                />
              )}
              {i < index && <div className="h-full w-full bg-primary" />}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            aria-label={t("prevLabel")}
            className="cursor-pointer shrink-0 w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            ←
          </button>

          <div className="flex-1 min-h-45 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <span className="text-4xl font-bold text-primary-light">{step.number}</span>
                <h3 className="text-2xl font-semibold mt-3 mb-3">{step.title}</h3>
                <p className="text-text-muted leading-relaxed max-w-xl">{step.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            aria-label={t("nextLabel")}
            className="cursor-pointer shrink-0 w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            →
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}

function CTA() {
  const t = useTranslations("cta");

  return (
    <motion.section
      id="contact"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-32 text-center"
    >
      <motion.h2 variants={item} className="text-3xl md:text-5xl font-bold mb-6">
        {t("title")}
      </motion.h2>

      <motion.p variants={item} className="text-lg text-text-muted max-w-xl mx-auto mb-10">
        {t("description")}
      </motion.p>

      <motion.div variants={item}>
        <a
          href="https://calendly.com/jawed-bensaih-skaleflow/entretien-de-decouverte"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-primary-light text-text-inverted font-medium px-8 py-4 rounded-full transition-colors text-lg"
        >
          {t("button")}
        </a>
      </motion.div>
    </motion.section>
  );
}

function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-text-muted">
          © {new Date().getFullYear()} SkaleFlow. {t("rights")}
        </span>

        <div className="flex gap-6 text-sm text-text-muted">
          <Link href={`/${locale}/privacy`} className="hover:text-text transition-colors">
            {t("privacyLink")}
          </Link>
          <Link href={`/${locale}/legal`} className="hover:text-text transition-colors">
            {t("legalLink")}
          </Link>
          <a href={`mailto:${t("email")}`} className="hover:text-text transition-colors">
            {t("email")}
          </a>
          <a
            href="https://instagram.com/skaleflow.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/skaleflow/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}