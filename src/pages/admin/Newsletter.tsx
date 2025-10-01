import React, { useState } from 'react';
import { Send, FileText, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const AdminNewsletter = () => {
  const [newsletterData, setNewsletterData] = useState({
    subject: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data - sera remplacé par Supabase
  const newsletterStats = [
    {
      title: 'Total abonnés',
      value: '247',
      change: '+23 cette semaine',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Newsletters envoyées',
      value: '12',
      change: '+2 ce mois',
      icon: Send,
      color: 'text-green-600'
    },
    {
      title: 'Taux d\'ouverture',
      value: '68%',
      change: '+5% vs dernier',
      icon: TrendingUp,
      color: 'text-blue-600'
    }
  ];

  const recentNewsletters = [
    {
      id: 1,
      subject: 'Nouveau projet : E-commerce Platform',
      sentDate: '2024-01-15',
      recipients: 247,
      openRate: '72%',
      status: 'sent'
    },
    {
      id: 2,
      subject: 'Mes dernières actualités tech',
      sentDate: '2024-01-01',
      recipients: 224,
      openRate: '65%',
      status: 'sent'
    },
    {
      id: 3,
      subject: 'Bonne année et nouveaux projets !',
      sentDate: '2023-12-31',
      recipients: 198,
      openRate: '78%',
      status: 'sent'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewsletterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterData.subject || !newsletterData.content) return;

    setIsLoading(true);
    
    // Simulation d'envoi - sera remplacé par l'API Supabase
    setTimeout(() => {
      toast({
        title: "Newsletter envoyée !",
        description: `Votre newsletter "${newsletterData.subject}" a été envoyée à 247 abonnés.`,
      });
      setNewsletterData({ subject: '', content: '' });
      setIsLoading(false);
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500/10 text-green-600">Envoyée</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/10 text-yellow-600">Brouillon</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Newsletter</h1>
          <p className="text-muted-foreground">
            Créez et envoyez des newsletters à vos abonnés
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsletterStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        {stat.change}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Newsletter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Créer une newsletter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendNewsletter} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Sujet
                  </label>
                  <Input
                    name="subject"
                    placeholder="Sujet de votre newsletter..."
                    value={newsletterData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Contenu
                  </label>
                  <Textarea
                    name="content"
                    placeholder="Rédigez le contenu de votre newsletter..."
                    value={newsletterData.content}
                    onChange={handleInputChange}
                    rows={8}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Envoi en cours...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer à 247 abonnés
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline">
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recent Newsletters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Newsletters récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNewsletters.map((newsletter) => (
                  <div key={newsletter.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground line-clamp-1 flex-1 mr-2">
                        {newsletter.subject}
                      </h3>
                      {getStatusBadge(newsletter.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Envoyée le :</span>
                        <br />
                        {new Date(newsletter.sentDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Destinataires :</span>
                        <br />
                        {newsletter.recipients}
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm">
                      <span className="text-green-600 font-medium">
                        {newsletter.openRate} taux d'ouverture
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;