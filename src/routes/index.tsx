import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/excuse/Hero";
import { Generator } from "@/components/excuse/Generator";
import { SiteNav } from "@/components/excuse/SiteNav";
import { ExampleExcuses, Footer, HowItWorks } from "@/components/excuse/Sections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EXCUSE ME? — Not an apology. An explanation." },
      {
        name: "description",
        content: "AI-powered excuses for questionable situations. English, Hinglish & Hindi.",
      },
      { property: "og:title", content: "EXCUSE ME? — Not an apology. An explanation." },
      {
        property: "og:description",
        content: "You have a problem. We have an excuse.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  function scrollToGenerator() {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero onStart={scrollToGenerator} onEmergency={() => setEmergencyOpen(true)} />
      <Generator emergencyOpen={emergencyOpen} onEmergencyOpenChange={setEmergencyOpen} />
      <HowItWorks />
      <ExampleExcuses />
      <Footer />
    </main>
  );
}
