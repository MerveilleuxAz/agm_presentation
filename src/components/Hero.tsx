import { useEffect, useState } from 'react';
import { ChevronDown, Code, Layers, Lightbulb, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import developerHero from '@/assets/hero.jpeg';

const CV_PATH = '/cv/merveilleux-azihou-cv.pdf';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Développeur Full Stack & Passionné de Technologie';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    // { icon: Monitor, text: 'Développement Web' },
    { icon: Code, text: 'Développement logiciels' },
    { icon: Layers, text: 'Projets numériques' },
    { icon: Lightbulb, text: 'Innovation' },
  ];

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center bg-gradient-hero text-white relative overflow-hidden pt-16 md:pt-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-wine-dark to-wine opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] md:min-h-screen">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-white">Merveilleux </span>
                <span className="text-primary">Azihou</span>
              </h1>
              <div className="min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center lg:justify-start">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white/90 leading-snug">
                  {typedText}
                  <span className="animate-pulse text-primary">|</span>
                </h2>
              </div>
            </div>

            <p className="text-base md:text-lg text-white/80 mb-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Je suis développeur web spécialisé dans la création d'applications modernes,
              performantes et orientées utilisateur.
            </p>
            <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              J'aime transformer des idées en solutions concrètes, en combinant développement web,
              logique produit et technologies innovantes.
            </p>

            <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 text-sm text-white/80"
                >
                  <tag.icon size={14} className="text-primary" />
                  {tag.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-primary hover:border-primary"
                onClick={() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Voir mes projets
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-primary hover:border-primary"
                asChild
              >
                <a href={CV_PATH} download>
                  Télécharger mon CV
                </a>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary-glow"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Me contacter
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={developerHero}
                  alt="Merveilleux Azihou - Développeur Full Stack"
                  className="w-full max-w-5xl aspect-[16/10] object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-wine/20 to-transparent"></div>
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-wine/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/80 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-primary/30 scale-90 md:scale-100">
                <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-mono text-[12px] md:text-xs text-green-400">
                  <div>const developer = {`{`}</div>
                  <div className="ml-1 md:ml-2 text-white">name: "Merveilleux Azihou",</div>
                  <div className="ml-1 md:ml-2 text-primary">focus: "Web & Produits"</div>
                  <div>{`};`}</div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">Full Stack</div>
                  <div className="text-xs text-white/80">Développeur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce hidden md:block"
        aria-label="Défiler vers la section suivante"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
