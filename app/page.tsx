import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesGrid from "@/components/features-grid";
import HowItWorks from "@/components/how-it-works";
import FeaturedDrops from "@/components/featured-drops";
import CommunitySection from "@/components/community-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <FeaturedDrops />
      <CommunitySection />
      <Footer />
    </main>
  );
}
