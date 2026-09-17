"use client";

import { useState } from "react";
import Image from "next/image";

const links = [
  { label: "Services", href: "#services" },
  { label: "Méthode", href: "#methode" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <a href="/" className="flex items-center">
        <Image
          src="/logo/skaleflow-logo-white.png"
          alt="SkaleFlow"
          width={140}
          height={40}
          priority
        />
      </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="bg-primary hover:bg-primary-light text-text-inverted text-sm font-medium px-4 py-2 rounded-full transition-colors">
            Réserver un appel
          </a>
        </nav>

        <button className="md:hidden text-text" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-text-muted">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}