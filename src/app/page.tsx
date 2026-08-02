import { SiteNav } from "@/components/home/SiteNav";
import { Hero } from "@/components/home/Hero";
import { Objections } from "@/components/home/Objections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { Services } from "@/components/home/Services";
import { Guarantee } from "@/components/home/Guarantee";
import { ForArtisans } from "@/components/home/ForArtisans";
import { BookingForm } from "@/components/home/BookingForm";
import { SiteFooter } from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <div className="bg-white">
      <SiteNav />
      <main>
        <Hero />
        <Objections />
        <MarqueeBand />
        <HowItWorks />
        <Services />
        <Guarantee />
        <BookingForm />
        <ForArtisans />
      </main>
      <SiteFooter />
    </div>
  );
}
