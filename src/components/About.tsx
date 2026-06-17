import { useEffect, useRef } from 'react';
import { Code, Database, Smartphone, Palette, Award, Coffee } from 'lucide-react';
import developerProfile from '@/assets/profile.jpeg';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in-up');
    elementsToObserve?.forEach((el) => observer.observe(el));

    return () => {
      elementsToObserve?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const skills = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Création d\'applications web modernes avec React, TypeScript, Node.js et Laravel'
    },
    {
      icon: Smartphone,
      title: 'Applications Mobile',
      description: 'Développement d\'apps mobiles natives et cross-platform avec Flutter'
    },
    {
      icon: Database,
      title: 'Data Analysis',
      description: 'Analyse et visualisation de données avec Python, SQL et outils de Business Intelligence'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Conception d\'interfaces utilisateur intuitives et expériences utilisateur optimales'
    }
  ];

  const stats = [
    { number: '20+', label: 'Projets réalisés' },
    { number: '3+', label: 'Années d\'expérience' },
    { number: '15+', label: 'Technologies maîtrisées' },
    { number: '96%', label: 'Clients satisfaits' }
  ];

  return (
    <section id="apropos" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
            À <span className="text-primary">propos</span>
          </h2>
          <p className="fade-in-up text-lg text-muted-foreground max-w-3xl mx-auto">
            Développeur passionné avec une approche multidisciplinaire,
            je combine technique et créativité pour créer des solutions innovantes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile image placeholder */}
          <div className="fade-in-up">
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-square rounded-2xl bg-gradient-wine shadow-wine overflow-hidden">
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Coffee size={32} />
                    </div>
                    <img
                      src={developerProfile}
                      alt="Développeur travaillant sur des projets tech modernes"
                      className="w-fullh-auto object-cover"
                    />
                    <p className="text-lg font-medium">Photo de profil</p>
                    <p className="text-sm opacity-80">À venir</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-wine/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Profile content */}
          <div className="fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Créateur d'expériences numériques
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Avec plus de 3 ans d'expérience dans le développement web et mobile,
              je me spécialise dans la création d'applications performantes et d'interfaces
              utilisateur élégantes. Ma passion pour la data analysis me permet d'apporter
              une dimension analytique à mes projets.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Mon approche combine rigueur technique et sensibilité design pour livrer
              des solutions qui répondent parfaitement aux besoins utilisateurs tout en
              respectant les contraintes business.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="fade-in-up group">
              <div className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-wine transition-all duration-300 border border-border group-hover:border-primary/20">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <skill.icon size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {skill.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;