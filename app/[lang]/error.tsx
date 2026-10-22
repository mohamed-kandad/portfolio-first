"use client";
import { useParams } from "next/navigation";
const copy = {
  en: {
    heading: "SOMETHING DIDN’T LOAD.",
    text: "Give it another try.",
    button: "Try again",
  },
  fr: {
    heading: "LE CHARGEMENT A ÉCHOUÉ.",
    text: "Veuillez réessayer.",
    button: "Réessayer",
  },
  ar: {
    heading: "تعذّر تحميل المحتوى.",
    text: "يرجى المحاولة مجددًا.",
    button: "إعادة المحاولة",
  },
};
export default function ErrorPage({ reset }: { reset: () => void }) {
  const params = useParams();
  const lang = params.lang === "fr" ? "fr" : params.lang === "ar" ? "ar" : "en";
  const d = copy[lang];
  return (
    <main id="main" className="not-found">
      <h1>{d.heading}</h1>
      <p>{d.text}</p>
      <button className="button button-primary" onClick={reset}>
        {d.button} ↗
      </button>
    </main>
  );
}
