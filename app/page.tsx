import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Internship from "@/components/sections/Internship";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import SoftSkills from "@/components/sections/SoftSkills";
import Languages from "@/components/sections/Languages";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Internship />
      <Certifications />
      <Achievements />
      <SoftSkills />
      <Languages />
      <Contact />
      <Footer />
    </main>
  );
}
