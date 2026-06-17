import { useEffect, useRef } from 'react';
import { Download, FileText, Briefcase, GraduationCap, FolderKanban } from 'lucide-react';
import { Button } from './ui/button';

const CV_PATH = '/cv/merveilleux-azihou-cv.pdf';

const CV = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const sections = [
    { icon: FileText, label: 'Profil' },
    { icon: Briefcase, label: 'Compétences' },
    { icon: FolderKanban, label: 'Expériences' },
    { icon: FolderKanban, label: 'Projets' },
    { icon: GraduationCap, label: 'Formation' }
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
    <section id="cv" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
          Mon <span className="text-primary">CV</span>
        </h2>
        <p className="fade-in-up text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Téléchargez mon CV pour une vue complète de mon profil professionnel.
        </p>

        <div className="fade-in-up flex flex-wrap justify-center gap-4 mb-10">
          {sections.map((section) => (
            <div
              key={section.label}
              className="flex flex-col items-center p-4 bg-card rounded-xl border border-border shadow-elegant min-w-[100px]"
            >
              <section.icon size={22} className="text-primary mb-2" />
              <span className="text-xs font-medium text-muted-foreground">
                {section.label}
              </span>
            </div>
          ))}
        </div>

        <Button size="lg" className="fade-in-up bg-primary hover:bg-primary-glow px-8" asChild>
          <a href={CV_PATH} download>
            <Download size={20} className="mr-2" />
            Télécharger mon CV (PDF)
          </a>
        </Button>
      </div>
    </section>
  );
};

export default CV;
