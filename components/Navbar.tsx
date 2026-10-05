"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  const links = [
    { label: t("services"), href: "#services" },
    { label: t("methode"), href: "#methode" },
    { label: t("contact"), href: "#contact" },
  ];

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/logo/skaleflow-logo-white.png"
            alt="SkaleFlow"
            width={140}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}

          <Link
            href={`/${otherLocale}`}
            className="text-sm text-text-muted hover:text-text transition-colors uppercase"
          >
            {otherLocale}
          </Link>

          <a
            href="#contact"
            className="bg-primary hover:bg-primary-light text-text-inverted text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            {t("cta")}
          </a>
        </nav>

        <button
          className="md:hidden text-text cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-text-muted"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${otherLocale}`}
            onClick={() => setOpen(false)}
            className="text-sm text-text-muted uppercase"
          >
            {otherLocale}
          </Link>
        </nav>
      )}
    </header>
  );
}