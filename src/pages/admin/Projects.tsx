import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminProjects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - sera remplacé par les données de Supabase
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plateforme de commerce électronique complète avec panier, paiements et gestion des commandes.',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB'],
      status: 'published',
      image: '/placeholder.svg',
      createdAt: '2024-01-15',
      views: 245
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Application mobile de gestion des tâches avec synchronisation cloud.',
      category: 'mobile',
      technologies: ['React Native', 'Firebase'],
      status: 'draft',
      image: '/placeholder.svg',
      createdAt: '2024-01-10',
      views: 89
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Dashboard de visualisation de données avec graphiques interactifs.',
      category: 'data',
      technologies: ['Vue.js', 'D3.js', 'Python'],
      status: 'published',
      image: '/placeholder.svg',
      createdAt: '2024-01-05',
      views: 156
    }
  ];

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'data', label: 'Data' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Publié</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Brouillon</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projets</h1>
            <p className="text-muted-foreground">
              Gérez vos projets et réalisations
            </p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate('/admin/projects/new')}
          >
            <Plus className="w-4 h-4" />
            Nouveau projet
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">
                    Image du projet
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {project.title}
                    </h3>
                    {getStatusBadge(project.status)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>Créé le {new Date(project.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {project.views}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Aucun projet ne correspond à vos critères de recherche.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;