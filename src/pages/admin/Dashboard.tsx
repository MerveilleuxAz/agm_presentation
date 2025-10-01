import React from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Mail, 
  Folder,
  TrendingUp,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';

const Dashboard = () => {
  const stats = [
    {
      title: 'Projets publiés',
      value: '12',
      icon: Folder,
      change: '+2 ce mois',
      changeType: 'positive'
    },
    {
      title: 'Abonnés newsletter',
      value: '247',
      icon: Users,
      change: '+23 cette semaine',
      changeType: 'positive'
    },
    {
      title: 'Vues portfolio',
      value: '1,429',
      icon: Eye,
      change: '+12% ce mois',
      changeType: 'positive'
    },
    {
      title: 'Messages contact',
      value: '18',
      icon: MessageSquare,
      change: '+5 cette semaine',
      changeType: 'positive'
    }
  ];

  const recentActivity = [
    {
      action: 'Nouveau projet ajouté',
      details: 'E-commerce Platform',
      time: 'Il y a 2 heures',
      type: 'project'
    },
    {
      action: 'Nouvel abonné newsletter',
      details: 'marie.dupont@email.com',
      time: 'Il y a 4 heures',
      type: 'newsletter'
    },
    {
      action: 'Message de contact reçu',
      details: 'Jean Martin - Demande de collaboration',
      time: 'Il y a 1 jour',
      type: 'contact'
    },
    {
      action: 'Compétence mise à jour',
      details: 'React.js → Expert',
      time: 'Il y a 2 jours',
      type: 'skill'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return Folder;
      case 'newsletter': return Mail;
      case 'contact': return MessageSquare;
      case 'skill': return Settings;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-blue-600';
      case 'newsletter': return 'text-primary';
      case 'contact': return 'text-green-600';
      case 'skill': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre portfolio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
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
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)} bg-current/10`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.details}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Folder className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Ajouter un projet</span>
                </div>
              </button>

              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Envoyer newsletter</span>
                </div>
              </button>

              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Paramètres</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;