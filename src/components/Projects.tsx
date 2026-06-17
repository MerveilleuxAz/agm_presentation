import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter, Globe, Smartphone, ChartNetwork, PenTool } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: 'all', label: 'Tous', icon: Filter },
    { id: 'web', label: 'Web', icon: Globe },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'data', label: 'Data', icon: ChartNetwork },
    { id: 'design', label: 'Design', icon: PenTool }
  ];

  const projects = [
    {
      id: 1,
      title: 'Campagne Publicitaire par Mail',
      description: 'A comprehensive platform for sustainable living, featuring interactive guides and community features.',
      role: 'Ton rôle dans le projet',
      result: 'Ce que le projet permet de faire',
      image: '/img/works/uiux/mail_campagn.png',
      categories: ['web'],
      technologies: ['Laravel', 'Ajax', 'MySQL'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'ZemiHi App',
      description: 'Application mobile de suivi de santé avec synchronisation cloud et visualisations interactives.',
      role: 'Ton rôle dans le projet',
      result: 'Ce que le projet permet de faire',
      image: '/img/works/uiux/zemihi.png',
      categories: ['mobile', 'design'],
      technologies: ['Figma', 'Flutter', 'Node.js', 'PostgresQL'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'FAI (Fournisseur d\'Accès Internet)',
      description: 'Dashboard interactif pour la visualisation et l\'analyse de données business en temps réel.',
      role: 'Ton rôle dans le projet',
      result: 'Ce que le projet permet de faire',
      image: '/img/works/uiux/fai.png',
      categories: ['design'],
      technologies: ['Figma', 'Photoshop'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'IFRI Chat App',
      description: 'Système de design complet avec composants réutilisables et documentation interactive.',
      role: 'Ton rôle dans le projet',
      result: 'Ce que le projet permet de faire',
      image: '/img/works/uiux/ifri_chat.png',
      categories: ['mobile'],
      technologies: ['Figma', 'Flutter', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'GléHi',
      description: 'Chatbot intelligent avec traitement du langage naturel pour le support client automatisé.',
      role: 'Ton rôle dans le projet',
      result: 'Ce que le projet permet de faire',
      image: '/img/works/uiux/glehi.png',
      categories: ['design', 'mobile'],
      technologies: ['Figma', 'Flutter', 'Node.js', 'MongoDB'],
      demoUrl: 'https://www.figma.com/design/irvhQSrtYwUXM28Vrv5Ont/AgriMarket-?node-id=0-1&p=f',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Système de recommandation',
      description: 'Application mobile showcase avec animations fluides et interface utilisateur moderne.',
      role: 'Ton rôle dans le projet',
      result: 'Ce que le projet permet de faire',
      image: '/img/works/data/data.png',
      categories: ['data'],
      technologies: ['Python', 'Streamlit'],
      demoUrl: 'https://recommendation-system-tqx44f6fbuubanguhxbptw.streamlit.app/',
      githubUrl: '#'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));

  const handleFilterChange = (filterId: string) => {
    if (filterId === activeFilter) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(filterId);
      setIsTransitioning(false);
    }, 250);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            // Optionnel: Si vous voulez réinitialiser l'animation quand l'élément sort du viewport
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Sélectionnez tous les éléments .fade-in-up dans la section et observez-les
    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in-up, .project-card'); // Assurez-vous d'inclure les cartes de projet si elles doivent s'animer individuellement
    elementsToObserve?.forEach((el) => observer.observe(el));

    // Nettoyage: Désinscrivez tous les observateurs lorsque le composant est démonté ou que filteredProjects change
    return () => {
      elementsToObserve?.forEach((el) => observer.unobserve(el));
      observer.disconnect(); // S'assurer que tous les observateurs sont déconnectés
    };
  }, [filteredProjects]); // Dépendance sur filteredProjects pour réexécuter l'effet

  return (
    <section id="projets" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mes <span className="text-primary">Projets</span>
          </h2>
          <p className="fade-in-up text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez une sélection de mes réalisations les plus récentes,
            alliant innovation technique et excellence design.
          </p>

          {/* Filters */}
          <div className="fade-in-up flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => handleFilterChange(filter.id)}
                className={`transition-all duration-300 ${activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground shadow-wine scale-105'
                  : 'hover:bg-primary/10 hover:text-primary hover:scale-105'
                  }`}
              >
                <filter.icon size={16} className="mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ${isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
          }`}>
          {filteredProjects.map((project, index) => (
            <div
              key={`${activeFilter}-${project.id}`}
              className="fade-in-up project-card bg-card rounded-xl overflow-hidden shadow-elegant border border-border animate-fade-in transition-all duration-300 hover:shadow-wine hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-wine overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-wine/40 flex items-center justify-center">
                  <img src={`${project.image}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={project.demoUrl}
                    className="w-8 h-8 bg-primary-glow rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="w-8 h-8 bg-primary-glow rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  {project.title}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Description</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Rôle</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.role}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Résultat</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary-glow"
                    asChild
                  >
                    <a href={project.demoUrl}>
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a href={project.githubUrl}>
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="fade-in-up text-muted-foreground mb-6">
            Vous avez un projet en tête ?
          </p>
          <Button
            size="lg"
            className="fade-in-up bg-primary hover:bg-primary-glow"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Discutons de votre projet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;