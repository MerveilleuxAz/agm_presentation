import { useEffect, useState } from 'react';
import { ChevronDown, Code, Smartphone, BarChart3, Palette } from 'lucide-react';
import { Button } from './ui/button';
import developerHero from '@/assets/hero.jpeg';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Développeur Fullstack & Designer';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const specialties = [
    { icon: Code, text: 'Développement Web' },
    { icon: Smartphone, text: 'Applications Mobile' },
    { icon: BarChart3, text: 'Data Analysis' },
    { icon: Palette, text: 'UI/UX Design' }
  ];

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center bg-gradient-hero text-white relative overflow-hidden pt-16 md:pt-0">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-wine-dark to-wine opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] md:min-h-screen">

          {/* Content Left / Top on mobile */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <p className="text-lg md:text-xl text-white/80 mb-4">Hello, je suis</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-white">Merveilleux </span>
                <span className="text-primary">AZIHOU</span>
              </h1>
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90">
                  {typedText}
                  <span className="animate-pulse text-primary">|</span>
                </h2>
              </div>
            </div>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Passionné par la création d'expériences numériques exceptionnelles,
              je transforme vos idées en solutions digitales innovantes.
            </p>

            {/* Specialties */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="flex items-center group p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <specialty.icon size={18} className="text-white group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-white/80 font-medium">{specialty.text}</p>
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
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary-glow mb-2 md:mb-0"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Me contacter
              </Button>
            </div>
          </div>

          {/* Image Right / Top on mobile */}
          <div className="relative order-1 lg:order-2">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={developerHero}
                  alt="Développeur travaillant sur des projets tech modernes"
                  className="w-full max-w-5xl aspect-[16/10] object-cover rounded-xl"
                />


                <div className="absolute inset-0 bg-gradient-to-tr from-wine/20 to-transparent"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-wine/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

              {/* Code snippet floating element */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/80 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-primary/30 scale-90 md:scale-100">
                <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-mono text-[12px] md:text-xs text-green-400">
                  <div>const developer = {`{`}</div>
                  <div className="ml-1 md:ml-2 text-white">name: "Merveilleux AZIHOU",</div>
                  <div className="ml-1 md:ml-2 text-primary">passion: "Innovation"</div>
                  <div>{`};`}</div>
                </div>
              </div>

              {/* Stats floating element */}
              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">20+</div>
                  <div className="text-xs text-white/80">Projets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce hidden md:block"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;