import { useTranslations } from "next-intl";

type Section = { heading: string; body: string };

export default function LegalPage() {
  const t = useTranslations("legal");
  const sections = t.raw("sections") as Section[];

  return (
    <main className="max-w-3xl mx-auto px-6 py-32">
      <h1 className="text-3xl md:text-4xl font-bold mb-10">{t("title")}</h1>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
            <p className="text-text-muted leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}