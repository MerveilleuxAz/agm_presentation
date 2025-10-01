import { Github, Linkedin, Mail, Heart, MessageCircleCode } from 'lucide-react';
import Newsletter from './Newsletter';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:merveilleuxazihou@gmail.com',
      label: 'Email'
    },
    {
      icon: MessageCircleCode,
      href: 'https://wa.me/22952431695',
      label: 'WhatsApp'
    }
  ];

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Logo et description */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              Merveilleux<span className="text-primary">Azihou</span>
            </h3>
            <p className="text-white/70 text-sm">
              Développeur fullstack passionné par la création d'expériences numériques innovantes.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <Newsletter />
          </div>

          {/* Navigation rapide */}
          <div className="text-center">
            <h4 className="font-semibold mb-3">Navigation</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Accueil', 'À propos', 'Projets', 'Compétences', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase().replace('à ', ''))?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux */}
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
          <p className="text-white/60 text-sm flex items-center justify-center">
            © {currentYear} Merveilleux Azihou.
            { /* Créé avec <Heart size={16} className="text-primary mx-1" fill="currentColor" />
            et beaucoup de café.*/}
          </p>
          {/* <div className="mt-4">
            <a
              href="/admin/login"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Espace admin
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;