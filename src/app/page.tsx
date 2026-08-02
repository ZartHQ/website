import { SiteNav } from "@/components/home/SiteNav";
import { Hero } from "@/components/home/Hero";
import { Objections } from "@/components/home/Objections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { Guarantee } from "@/components/home/Guarantee";
import { ForArtisans } from "@/components/home/ForArtisans";
import { SiteFooter } from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <div className="bg-white">
      <SiteNav />
      <main>
        <Hero />
        <Objections />
        <HowItWorks />
        <Services />
        <Guarantee />
        <ForArtisans />
      </main>
      <SiteFooter />
    </div>
  );
}
