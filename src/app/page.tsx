import { SiteNav } from "@/components/home/SiteNav";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ForArtisans } from "@/components/home/ForArtisans";
import { SiteFooter } from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <div className="bg-white">
      <SiteNav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <ForArtisans />
      </main>
      <SiteFooter />
    </div>
  );
}
