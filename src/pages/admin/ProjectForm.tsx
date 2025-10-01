import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    technologies: [] as string[],
    status: 'draft',
    image: '',
    demoUrl: '',
    githubUrl: '',
    featured: false
  });

  const [currentTech, setCurrentTech] = useState('');

  const categories = [
    { value: 'web', label: 'Développement Web' },
    { value: 'mobile', label: 'Développement Mobile' },
    { value: 'uiux', label: 'UI/UX Design' },
    { value: 'data', label: 'Data Science' },
    { value: 'other', label: 'Autre' }
  ];

  useEffect(() => {
    if (isEditing) {
      // TODO: Charger les données du projet depuis Supabase
      // Simulation avec des données mock pour l'instant
      setFormData({
        title: 'E-commerce Platform',
        description: 'Plateforme de commerce électronique complète',
        longDescription: 'Une plateforme de commerce électronique moderne avec panier, paiements et gestion des commandes. Développée avec React et Node.js.',
        category: 'web',
        technologies: ['React', 'Node.js', 'MongoDB'],
        status: 'published',
        image: '/placeholder.svg',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/user/project',
        featured: true
      });
    }
  }, [isEditing, id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTechnology = () => {
    if (currentTech.trim() && !formData.technologies.includes(currentTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Sauvegarder avec Supabase
      console.log('Données du projet à sauvegarder:', formData);
      
      toast({
        title: isEditing ? "Projet modifié" : "Projet créé",
        description: `Le projet "${formData.title}" a été ${isEditing ? 'modifié' : 'créé'} avec succès.`,
      });

      navigate('/admin/projects');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la sauvegarde.",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/projects')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Modifiez les informations du projet' : 'Créez un nouveau projet pour votre portfolio'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations principales */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre du projet *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Mon super projet"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description courte *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Une description concise du projet"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="longDescription">Description détaillée</Label>
                    <Textarea
                      id="longDescription"
                      value={formData.longDescription}
                      onChange={(e) => handleInputChange('longDescription', e.target.value)}
                      placeholder="Description complète du projet, ses fonctionnalités, challenges, etc."
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="demoUrl">URL de démonstration</Label>
                      <Input
                        id="demoUrl"
                        value={formData.demoUrl}
                        onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                        placeholder="https://demo.monprojet.com"
                        type="url"
                      />
                    </div>

                    <div>
                      <Label htmlFor="githubUrl">URL GitHub</Label>
                      <Input
                        id="githubUrl"
                        value={formData.githubUrl}
                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        placeholder="https://github.com/user/repo"
                        type="url"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies utilisées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      placeholder="React, Node.js, MongoDB..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    />
                    <Button type="button" onClick={addTechnology}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Image du projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image">URL de l'image</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="/img/projects/mon-projet.png"
                      />
                    </div>
                    
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Ou glissez-déposez une image ici
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Parcourir les fichiers
                      </Button>
                    </div>

                    {formData.image && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Aperçu:</p>
                        <div className="w-32 h-20 bg-muted rounded border overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Aperçu"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Paramètres */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Statut *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange('featured', checked)}
                    />
                    <Label htmlFor="featured">Projet mis en avant</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Button type="submit" className="w-full">
                      {isEditing ? 'Mettre à jour' : 'Créer le projet'}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/admin/projects')}
                    >
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProjectForm;