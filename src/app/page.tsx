import { BoneDivider } from "@/components/BoneDivider";
import { Loader } from "@/components/motion/Loader";
import { PageMotion } from "@/components/motion/PageMotion";
import { Clinic } from "@/components/sections/Clinic";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { Emergency } from "@/components/sections/Emergency";
import { Faq } from "@/components/sections/Faq";
import { Forms } from "@/components/sections/Forms";
import { Hero } from "@/components/sections/Hero";
import { Hours } from "@/components/sections/Hours";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Resources } from "@/components/sections/Resources";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Story } from "@/components/sections/Story";
import { Team } from "@/components/sections/Team";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { Welcome } from "@/components/sections/Welcome";
import { WhyUs } from "@/components/sections/WhyUs";

const Divider = () => <BoneDivider className="pt-16 lg:pt-20" />;

export default function Home() {
  return (
    <>
      <Loader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <TrustMarquee />
        <Welcome />
        <Story />
        <Divider />
        <Services />
        <Clinic />
        <Divider />
        <HowItWorks />
        <Hours />
        <Emergency />
        <Divider />
        <Team />
        <Reviews />
        <Divider />
        <WhyUs />
        <Resources />
        <Divider />
        <Forms />
        <Faq />
        <CtaBand />
        <Contact />
        <PageMotion />
      </main>
    </>
  );
}
