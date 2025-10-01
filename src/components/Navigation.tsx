import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Award, Mail } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'apropos', label: 'À propos', icon: User },
    { id: 'projets', label: 'Projets', icon: Briefcase },
    { id: 'competences', label: 'Compétences', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">
              Merveilleux<span className="text-primary">Azihou</span>
              {/* Portfolio<span className="text-primary">.</span> */}
            </div>

            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md rounded-2xl shadow-xl bg-background/80 backdrop-blur-xl border border-border md:hidden transition-all">
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 min-w-[60px] mx-1
          ${activeSection === item.id
                  ? 'text-primary bg-primary/10 scale-110 shadow-md'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}
        `}
              style={{ zIndex: 1 }}
            >
              <item.icon
                size={20}
                className={`mb-1 transition-all duration-300 ${activeSection === item.id ? 'scale-110' : ''
                  }`}
              />
              <span className={`text-xs font-medium transition-all duration-300 ${activeSection === item.id ? 'opacity-100' : 'opacity-70'
                }`}>
                {/* {item.label} */}
              </span>
              {activeSection === item.id && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;