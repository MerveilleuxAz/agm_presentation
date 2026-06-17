import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_7ihuyqp',
    TEMPLATE_ID: 'template_v40j66f',
    PUBLIC_KEY: 'BmBw8512MYdapWysJ'
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'merveilleuxazihou@gmail.com',
      href: 'mailto:merveilleuxazihou@gmail.com'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'merveilleux-azihou',
      href: 'https://www.linkedin.com/in/merveilleux-azihou'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'MerveilleuxAz',
      href: 'https://github.com/MerveilleuxAz'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'merveilleuxazihou@gmail.com'
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
        duration: 5000,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-4xl md:text-5xl font-bold text-foreground mb-6">
            Restons en <span className="text-primary">Contact</span>
          </h2>
          <p className="fade-in-up text-lg text-muted-foreground max-w-3xl mx-auto">
            Je suis ouvert aux opportunités de stage, emploi, freelance et collaboration
            sur des projets web.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="fade-in-up">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Me joindre
            </h3>

            <div className="space-y-4 mb-8">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center group p-4 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                    <link.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="text-foreground font-medium">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-6 bg-gradient-wine rounded-xl text-white">
              <div className="flex items-center mb-3">
                <CheckCircle size={20} className="text-green-300 mr-2" />
                <span className="font-medium">Disponible pour de nouvelles opportunités</span>
              </div>
              <p className="text-white/80 text-sm">
                Stage, emploi, freelance ou projet collaboratif — contactez-moi.
              </p>
            </div>
          </div>

          <div className="fade-in-up">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Envoyez-moi un message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Sujet
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Stage, emploi, projet..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px]"
                  placeholder="Décrivez votre opportunité ou votre projet..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-glow"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
