import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Partners from './components/Partners';
import OriginStory from './components/OriginStory';
import Footer from './components/Footer';



function App() {
  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Tokenomics />
        <Roadmap />
        <Partners />
        <OriginStory />
      </main>

      <Footer />
    </div>
  );
}

export default App;
