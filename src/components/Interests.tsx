import { useEffect, useRef } from 'react';
import { Code2, Brain, Users, Sparkles } from 'lucide-react';

const Interests = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const topics = [
    { icon: Code2, label: 'Développement logiciel' },
    { icon: Brain, label: 'Intelligence artificielle' },
    { icon: Sparkles, label: 'Nouvelles technologies' },
    { icon: Users, label: 'Projets collaboratifs' }
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
    <section id="interets" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-10">
          Centres d'<span className="text-primary">intérêt</span>
        </h2>

        <div className="fade-in-up space-y-6 mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Je m'intéresse au développement logiciel, à l'intelligence artificielle,
            aux nouvelles technologies et à la création de solutions numériques utiles.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            J'aime également participer à des projets collaboratifs qui me permettent
            d'apprendre et de progresser continuellement.
          </p>
        </div>

        <div className="fade-in-up flex flex-wrap justify-center gap-4">
          {topics.map((topic) => (
            <div
              key={topic.label}
              className="flex items-center gap-2 px-5 py-3 bg-card rounded-full border border-border shadow-elegant text-sm font-medium text-foreground"
            >
              <topic.icon size={18} className="text-primary" />
              {topic.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
