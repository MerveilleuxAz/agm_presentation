import { useEffect, useRef, useState } from 'react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Lightbulb, Palette, Code, Rocket } from 'lucide-react';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'Tailwind CSS', level: 88 }
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Laravel', level: 80 }
      ]
    },
    {
      title: 'Mobile',
      icon: '📱',
      skills: [
        { name: 'Flutter', level: 85 },
        { name: 'React Native', level: 80 }
      ]
    },
    {
      title: 'Data & Analytics',
      icon: '📊',
      skills: [
        { name: 'Python (Pandas)', level: 85 },
        { name: 'SQL', level: 88 }
      ]
    },
    {
      title: 'Design & Tools',
      icon: '🎯',
      skills: [
        { name: 'Figma', level: 88 },
        { name: 'Photoshop', level: 75 }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: '☁️',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 }
      ]
    }
  ];

  const tools = [
    'React', 'Flutter', 'Python', 'TypeScript', 'Node.js', 'PostgreSQL',
    'Figma', 'Tailwind', 'Next.js', 'Firebase', 'AWS', 'Docker',
    'MongoDB', 'Vue.js', 'Swift', 'Dart', 'SQL', 'Photoshop', 'Streamlit'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            setIsVisible(true);
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
    <section id="competences" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mes <span className="text-primary">Compétences</span>
          </h2>
          <p className="fade-in-up text-lg text-muted-foreground max-w-3xl mx-auto">
            Un panel de technologies et d'outils maîtrisés pour répondre
            à tous vos besoins de développement et de design.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="fade-in-up bg-card rounded-xl p-6 shadow-elegant border border-border hover:shadow-wine transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress
                      value={isVisible ? skill.level : 0}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Cloud */}
        <div className="fade-in-up">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-8">
            Technologies & Outils
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <div
                key={tool}
                className="skill-bubble px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground shadow-elegant"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <h3 className="fade-in-up text-3xl font-bold text-center text-foreground mb-4">
            Mon <span className="text-primary">Processus de Travail</span>
          </h3>
          <p className="fade-in-up text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Une approche structurée et méthodique pour garantir la réussite de chaque projet
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Analyse',
                desc: 'Compréhension approfondie des besoins, objectifs et contraintes du projet',
                icon: Lightbulb,
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '02',
                title: 'Conception',
                desc: 'Design UX/UI et architecture technique optimisée pour votre solution',
                icon: Palette,
                color: 'from-purple-500 to-purple-600'
              },
              {
                step: '03',
                title: 'Développement',
                desc: 'Codage avec les meilleures pratiques et technologies adaptées',
                icon: Code,
                color: 'from-green-500 to-green-600'
              },
              {
                step: '04',
                title: 'Livraison',
                desc: 'Tests rigoureux, déploiement sécurisé et accompagnement post-livraison',
                icon: Rocket,
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, index) => (
              <div
                key={item.step}
                className="fade-in-up group text-center hover:transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <item.icon size={32} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Connector Line (hidden on mobile) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent transform translate-x-4" />
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="fade-in-up text-center mt-16 p-8 bg-gradient-wine rounded-2xl">
            <h4 className="text-2xl font-bold text-white mb-4">
              Prêt à concrétiser votre vision ?
            </h4>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Chaque étape est pensée pour maximiser la valeur et minimiser les risques de votre projet.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary backdrop-blur-sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Commençons ensemble
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;