import { useEffect, useRef } from 'react';
import { FolderKanban, Users, Zap } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      icon: FolderKanban,
      title: 'Projets personnels et collaboratifs',
      description: 'Participation à plusieurs projets personnels et collaboratifs, de la conception à la livraison.'
    },
    {
      icon: Zap,
      title: 'Applications web de bout en bout',
      description: 'Développement d\'applications web complètes : frontend, backend, intégration et déploiement.'
    },
    {
      icon: Users,
      title: 'Travail en équipe',
      description: 'Collaboration en contexte de développement rapide, notamment lors de hackathons et de projets académiques.'
    }
  ];

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

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">Expérience</span>
          </h2>
          <p className="fade-in-up text-lg text-muted-foreground max-w-2xl mx-auto">
            Projet & Collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className="fade-in-up bg-card rounded-xl p-6 shadow-elegant border border-border hover:border-primary/20 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <exp.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {exp.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
