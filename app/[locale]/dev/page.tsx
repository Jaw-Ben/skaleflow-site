import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function DevPage() {
  const t = useTranslations("start");
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold">{t("dev.title")}</h1>
      <p className="mt-4 text-lg text-text-muted">{t("comingSoon")}</p>
      <Link
        href={`/${locale}`}
        className="mt-10 border border-white/10 hover:border-white/30 text-text font-medium px-6 py-3 rounded-full transition-colors"
      >
        {t("back")}
      </Link>
    </div>
  );
}