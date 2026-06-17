import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À propos' },
    { id: 'competences', label: 'Compétences' },
    { id: 'experience', label: 'Expérience' },
    { id: 'projets', label: 'Projets' },
    { id: 'interets', label: 'Intérêts' },
    { id: 'cv', label: 'CV' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/MerveilleuxAz', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/merveilleux-azihou', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:merveilleuxazihou@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="text-xl font-bold mb-3">
              Merveilleux<span className="text-primary">Azihou</span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Développeur Full Stack passionné par la technologie et les solutions numériques utiles.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-3">Navigation</h4>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-3">Suivez-moi</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-primary hover:bg-primary/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Merveilleux Azihou. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
