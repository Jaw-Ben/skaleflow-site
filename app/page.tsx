"use client";

import { useState, useEffect } from "react";
import { motion, AnimateEffect, AnimatePresence } from "framer-motion";

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
        Growth Partner Agency
      </motion.span>

      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight"
      >
        On scale votre marque DTC avec du{" "}
        <span className="text-primary-light">contenu qui convertit</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 text-lg text-text-muted max-w-xl"
      >
        Production UGC, media buying Meta & TikTok, réseau de créateurs — tout sous un même toit pour accélérer votre acquisition.
      </motion.p>

      <motion.div 
      variants={item} 
      className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#contact"
          className="bg-primary hover:bg-primary-light text-text-inverted font-medium px-6 py-3 rounded-full transition-colors"
        >
          Réserver un appel
        </a>
        <a
          href="#services"
          className="border border-white/10 hover:border-white/30 text-text font-medium px-6 py-3 rounded-full transition-colors"
        >
          Voir nos services
        </a>
      </motion.div>
    </motion.section>
  );
}

function About() {
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
          Qui sommes-nous
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">
          Une équipe qui aide les marques à vendre plus, en ligne
        </h2>
      </motion.div>

      <motion.div variants={item} className="space-y-6 text-lg text-text-muted leading-relaxed text-center mb-12">
        <p className="text-xl md:text-2xl font-semibold text-text">
          SkaleFlow travaille avec des marques qui vendent leurs produits{" "}
          <span className="text-primary-light">directement sur internet</span>.
        </p>

        <p>
          Notre mission : créer des vidéos publicitaires qui donnent envie d'acheter, puis les diffuser
          au bon moment, aux bonnes personnes et au bon prix sur Instagram et TikTok.<br/>
          Notre objectif est de générer des ventes, pas seulement des vues.
        </p>

        <p>
          Notre différence tient à l'authenticité : on tourne des contenus adaptés au public, qui ressemblent à 
          ce que pourrait poster un créateur de contenu pour capter l'attention sans la forcer.
        </p>
      </motion.div>
    </motion.section>
  );
}

const services = [
  {
    title: "Production UGC",
    description:
      "Des publicités natives, pensées pour convertir sur Meta et TikTok — scriptées, tournées et montées par notre réseau de créateurs.",
  },
  {
    title: "Media Buying",
    description:
      "Pilotage et optimisation de vos campagnes Meta & TikTok Ads, avec une logique de test créatif constant pour baisser le CAC.",
  },
  {
    title: "Réseau de créateurs",
    description:
      "Accès à une communauté de créateurs sélectionnés pour votre niche, pour produire du contenu authentique à l'échelle.",
  },
];

function Services() {
  return (
    <motion.section
      id="services"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto px-6 py-32"
    >
      <motion.div variants={item} className="text-center mb-16">
        <span className="text-sm uppercase tracking-widest text-primary-light">
          Ce qu'on fait
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">Nos services</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="bg-surface border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-text-muted leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

const steps = [
  {
    number: "01",
    title: "Audit & Stratégie",
    description:
      "Analyse de votre marque, de votre situation et de vos demandes pour construire un plan d'acquisition sur-mesure.",
  },
  {
    number: "02",
    title: "Production",
    description:
      "Livraisons des premiers lots de contenu UGC, testés en amont sur des formats à fort potentiel.",
  },
  {
    number: "03",
    title: "Diffusion",
    description:
      "Lancement des campagnes Meta & TikTok avec une structure de test rigoureuse pour identifier rapidement les créas gagnantes.",
  },
  {
    number: "04",
    title: "Optimisation continue",
    description:
      "Itération hebdomadaire sur les budgets, audiences et pubs — la production ne s'arrête jamais, la performance non plus.",
  },
];

const SLIDE_DURATION = 5000; // 5 secondes

function Methode() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [key, setKey] = useState(0); // force le reset de la barre de progression

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
          Comment on travaille
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">Notre méthode</h2>
      </motion.div>

      <motion.div variants={item} className="relative">
        {/* Barres de progression */}
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

        {/* Contenu du slide */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            aria-label="Étape précédente"
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
                <span className="text-4xl font-bold text-primary-light">
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold mt-3 mb-3">{step.title}</h3>
                <p className="text-text-muted leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            aria-label="Étape suivante"
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
        Prêt à scaler votre marque ?
      </motion.h2>

      <motion.p
        variants={item}
        className="text-lg text-text-muted max-w-xl mx-auto mb-10"
      >
        Réservez un appel de 20 minutes pour qu'on identifie ensemble votre plus gros levier d'acquisition.
      </motion.p>

      <motion.div variants={item}>
        <a
          href="https://calendly.com/jawed-bensaih-skaleflow/entretien-de-decouverte"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-primary-light text-text-inverted font-medium px-8 py-4 rounded-full transition-colors text-lg"
        >
          Réserver un appel
        </a>
      </motion.div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-text-muted">
          © {new Date().getFullYear()} SkaleFlow. Tous droits réservés.
        </span>

        <div className="flex gap-6 text-sm text-text-muted">
          <a href="mailto:contact@skaleflow.co" className="hover:text-text transition-colors">
            contact@skaleflow.co
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