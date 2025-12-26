import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Work from '@/components/Work';
import Purpose from '@/components/Purpose';
import Tools from '@/components/Tools';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GradientBackground from '@/components/GradientBackground';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <GradientBackground />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Work />
        <Purpose />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
