import React, { useState } from 'react';
import { Users, Search, Download, Mail, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminSubscribers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([]);

  // Mock data - sera remplacé par Supabase
  const subscribers = [
    {
      id: 1,
      email: 'marie.dupont@gmail.com',
      name: 'Marie Dupont',
      subscribedAt: '2024-01-15T10:30:00Z',
      status: 'active',
      source: 'footer'
    },
    {
      id: 2,
      email: 'jean.martin@outlook.fr',
      name: 'Jean Martin',
      subscribedAt: '2024-01-10T14:22:00Z',
      status: 'active',
      source: 'contact'
    },
    {
      id: 3,
      email: 'sophie.bernard@yahoo.com',
      name: 'Sophie Bernard',
      subscribedAt: '2024-01-08T09:15:00Z',
      status: 'inactive',
      source: 'footer'
    },
    {
      id: 4,
      email: 'lucas.petit@free.fr',
      name: 'Lucas Petit',
      subscribedAt: '2024-01-05T16:45:00Z',
      status: 'active',
      source: 'footer'
    }
  ];

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(filteredSubscribers.map(s => s.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (subscriberId: number, checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(prev => [...prev, subscriberId]);
    } else {
      setSelectedSubscribers(prev => prev.filter(id => id !== subscriberId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-600">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500/10 text-gray-600">Inactif</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'footer':
        return <Badge variant="secondary">Footer</Badge>;
      case 'contact':
        return <Badge className="bg-blue-500/10 text-blue-600">Contact</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Abonnés Newsletter</h1>
            <p className="text-muted-foreground">
              Gérez votre liste d'abonnés ({subscribers.length} abonnés)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </Button>
            {selectedSubscribers.length > 0 && (
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Supprimer ({selectedSubscribers.length})
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Total abonnés
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {subscribers.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Abonnés actifs
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {subscribers.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Cette semaine
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    +{subscribers.filter(s => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(s.subscribedAt) > weekAgo;
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par email ou nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Liste des abonnés</CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSubscribers.length === filteredSubscribers.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  Tout sélectionner
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="w-12 p-4"></th>
                    <th className="text-left p-4 font-medium">Abonné</th>
                    <th className="text-left p-4 font-medium">Date d'inscription</th>
                    <th className="text-left p-4 font-medium">Source</th>
                    <th className="text-left p-4 font-medium">Statut</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((subscriber, index) => (
                    <tr 
                      key={subscriber.id} 
                      className="border-b hover:bg-muted/30 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedSubscribers.includes(subscriber.id)}
                          onCheckedChange={(checked) => 
                            handleSelectSubscriber(subscriber.id, checked as boolean)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-foreground">
                            {subscriber.name || 'Nom non fourni'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {subscriber.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(subscriber.subscribedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-4">
                        {getSourceBadge(subscriber.source)}
                      </td>
                      <td className="p-4">
                        {getStatusBadge(subscriber.status)}
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSubscribers.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucun abonné trouvé
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Aucun abonné ne correspond à votre recherche.' : 'Aucun abonné pour le moment.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscribers;