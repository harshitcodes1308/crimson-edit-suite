import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Work from '@/components/Work';
import Purpose from '@/components/Purpose';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Work />
        <Purpose />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
