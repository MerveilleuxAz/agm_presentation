import React, { useState } from 'react';
import { Save, Edit2, FileText, User, Briefcase, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const AdminContent = () => {
  const { toast } = useToast();

  // Mock data - sera remplacé par Supabase
  const [content, setContent] = useState({
    hero: {
      title: 'Alex Martin',
      subtitle: 'Développeur Fullstack',
      description: 'Passionné par la création d\'expériences numériques innovantes et performantes.',
      ctaText: 'Découvrir mes projets'
    },
    about: {
      title: 'À propos de moi',
      description: 'Développeur fullstack avec plus de 5 ans d\'expérience, je me spécialise dans la création d\'applications web modernes et performantes. Ma passion pour les nouvelles technologies me pousse à rester constamment à jour avec les dernières tendances du développement.',
      experience: '5+ années d\'expérience',
      projects: '50+ projets réalisés',
      clients: '30+ clients satisfaits'
    },
    contact: {
      title: 'Travaillons ensemble',
      description: 'Je suis toujours ouvert aux nouvelles opportunités et collaborations intéressantes.',
      email: 'alex.martin@example.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      availability: 'Disponible pour de nouveaux projets'
    },
    process: {
      title: 'Mon Processus de Travail',
      description: 'Une approche structurée pour des résultats exceptionnels',
      steps: [
        {
          title: 'Analyse & Stratégie',
          description: 'Comprendre vos besoins et définir la stratégie optimale'
        },
        {
          title: 'Design & Prototypage',
          description: 'Créer des maquettes et prototypes interactifs'
        },
        {
          title: 'Développement',
          description: 'Coder avec les meilleures pratiques et technologies'
        },
        {
          title: 'Tests & Optimisation',
          description: 'Assurer la qualité et les performances'
        },
        {
          title: 'Déploiement & Suivi',
          description: 'Mise en ligne et maintenance continue'
        }
      ]
    }
  });

  const [activeTab, setActiveTab] = useState('hero');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (section: string) => {
    setIsLoading(true);
    
    // Simulation de sauvegarde - sera remplacé par Supabase
    setTimeout(() => {
      toast({
        title: "Contenu sauvegardé !",
        description: `La section ${section} a été mise à jour avec succès.`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleStepChange = (stepIndex: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      process: {
        ...prev.process,
        steps: prev.process.steps.map((step, index) =>
          index === stepIndex ? { ...step, [field]: value } : step
        )
      }
    }));
  };

  const tabs = [
    { value: 'hero', label: 'Hero Section', icon: FileText },
    { value: 'about', label: 'À propos', icon: User },
    { value: 'contact', label: 'Contact', icon: Mail },
    { value: 'process', label: 'Processus', icon: Briefcase }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion du Contenu</h1>
          <p className="text-muted-foreground">
            Modifiez le contenu des différentes sections de votre portfolio
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Section Hero
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre principal</label>
                    <Input
                      value={content.hero.title}
                      onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sous-titre</label>
                    <Input
                      value={content.hero.subtitle}
                      onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                      placeholder="Votre métier"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={content.hero.description}
                    onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
                    rows={3}
                    placeholder="Décrivez-vous en quelques mots..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Texte du bouton</label>
                  <Input
                    value={content.hero.ctaText}
                    onChange={(e) => handleInputChange('hero', 'ctaText', e.target.value)}
                    placeholder="Texte du call-to-action"
                  />
                </div>

                <Button onClick={() => handleSave('hero')} disabled={isLoading}>
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Section À propos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input
                    value={content.about.title}
                    onChange={(e) => handleInputChange('about', 'title', e.target.value)}
                    placeholder="Titre de la section"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={content.about.description}
                    onChange={(e) => handleInputChange('about', 'description', e.target.value)}
                    rows={5}
                    placeholder="Parlez de votre parcours, vos compétences..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expérience</label>
                    <Input
                      value={content.about.experience}
                      onChange={(e) => handleInputChange('about', 'experience', e.target.value)}
                      placeholder="Ex: 5+ années"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Projets</label>
                    <Input
                      value={content.about.projects}
                      onChange={(e) => handleInputChange('about', 'projects', e.target.value)}
                      placeholder="Ex: 50+ projets"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Clients</label>
                    <Input
                      value={content.about.clients}
                      onChange={(e) => handleInputChange('about', 'clients', e.target.value)}
                      placeholder="Ex: 30+ clients"
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave('about')} disabled={isLoading}>
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Section Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre</label>
                    <Input
                      value={content.contact.title}
                      onChange={(e) => handleInputChange('contact', 'title', e.target.value)}
                      placeholder="Titre de la section contact"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Disponibilité</label>
                    <Input
                      value={content.contact.availability}
                      onChange={(e) => handleInputChange('contact', 'availability', e.target.value)}
                      placeholder="Votre disponibilité"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={content.contact.description}
                    onChange={(e) => handleInputChange('contact', 'description', e.target.value)}
                    rows={3}
                    placeholder="Message d'invitation au contact"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={content.contact.email}
                      onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Téléphone</label>
                    <Input
                      value={content.contact.phone}
                      onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Localisation</label>
                    <Input
                      value={content.contact.location}
                      onChange={(e) => handleInputChange('contact', 'location', e.target.value)}
                      placeholder="Ville, Pays"
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave('contact')} disabled={isLoading}>
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Process Section */}
          <TabsContent value="process">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Section Processus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre</label>
                    <Input
                      value={content.process.title}
                      onChange={(e) => handleInputChange('process', 'title', e.target.value)}
                      placeholder="Titre de la section processus"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={content.process.description}
                      onChange={(e) => handleInputChange('process', 'description', e.target.value)}
                      placeholder="Description du processus"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Étapes du processus</h3>
                  {content.process.steps.map((step, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <h4 className="font-medium">Étape {index + 1}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Titre</label>
                          <Input
                            value={step.title}
                            onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                            placeholder="Titre de l'étape"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description</label>
                          <Input
                            value={step.description}
                            onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                            placeholder="Description de l'étape"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button onClick={() => handleSave('process')} disabled={isLoading}>
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;