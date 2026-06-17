import { useEffect, useRef } from 'react';
import { Code, Brain, Wrench } from 'lucide-react';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: 'Développement',
      icon: Code,
      emoji: '💻',
      skills: [
        'Frontend : HTML, CSS, JavaScript, React, Next.js',
        'Backend : Node.js, PHP, Laravel',
        'API REST'
      ]
    },
    {
      title: 'Concepts',
      icon: Brain,
      emoji: '🧠',
      skills: [
        'UI/UX basics',
        'Architecture logicielle',
        'Résolution de problèmes'
      ]
    },
    {
      title: 'Outils',
      icon: Wrench,
      emoji: '🛠',
      skills: [
        'Git / GitHub',
        'Vercel / Netlify',
        'Firebase',
        'Docker (bases)'
      ]
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
    <section id="competences" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mes <span className="text-primary">Compétences</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="fade-in-up bg-card rounded-xl p-6 shadow-elegant border border-border hover:shadow-wine transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">{category.emoji}</span>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <category.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
