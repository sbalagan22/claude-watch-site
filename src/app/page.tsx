import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { States } from "@/components/site/States";
import { Download } from "@/components/site/Download";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <States />
        <Download />
      </main>
      <Footer />
    </>
  );
}
