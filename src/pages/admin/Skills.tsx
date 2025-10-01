import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Code, Database, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const AdminSkills = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: [70],
    category: 'frontend'
  });
  const { toast } = useToast();

  // Mock data - sera remplacé par Supabase
  const skills = [
    {
      id: 1,
      name: 'React',
      level: 90,
      category: 'frontend',
      icon: '⚛️',
      color: '#61DAFB'
    },
    {
      id: 2,
      name: 'TypeScript',
      level: 85,
      category: 'frontend',
      icon: '🔷',
      color: '#3178C6'
    },
    {
      id: 3,
      name: 'Node.js',
      level: 80,
      category: 'backend',
      icon: '🟢',
      color: '#339933'
    },
    {
      id: 4,
      name: 'MongoDB',
      level: 75,
      category: 'database',
      icon: '🍃',
      color: '#47A248'
    },
    {
      id: 5,
      name: 'Figma',
      level: 70,
      category: 'design',
      icon: '🎨',
      color: '#F24E1E'
    }
  ];

  const categories = [
    { value: 'frontend', label: 'Frontend', icon: Code, color: 'text-blue-600' },
    { value: 'backend', label: 'Backend', icon: Database, color: 'text-green-600' },
    { value: 'database', label: 'Base de données', icon: Database, color: 'text-purple-600' },
    { value: 'design', label: 'Design', icon: Palette, color: 'text-pink-600' }
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;

    // Simulation d'ajout - sera remplacé par Supabase
    toast({
      title: "Compétence ajoutée !",
      description: `${newSkill.name} a été ajoutée avec un niveau de ${newSkill.level[0]}%`,
    });

    setNewSkill({ name: '', level: [70], category: 'frontend' });
    setShowAddForm(false);
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 80) return 'Expert';
    if (level >= 60) return 'Intermédiaire';
    return 'Débutant';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : Code;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'text-gray-600';
  };

  const groupedSkills = categories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category === category.value)
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Compétences</h1>
            <p className="text-muted-foreground">
              Gérez vos compétences techniques et créatives
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvelle compétence
          </Button>
        </div>

        {/* Add Skill Form */}
        {showAddForm && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Ajouter une compétence</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom de la compétence</label>
                    <Input
                      placeholder="Ex: React, Python, Photoshop..."
                      value={newSkill.name}
                      onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Catégorie</label>
                    <Select
                      value={newSkill.category}
                      onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Niveau: {newSkill.level[0]}% - {getLevelText(newSkill.level[0])}
                  </label>
                  <Slider
                    value={newSkill.level}
                    onValueChange={(value) => setNewSkill(prev => ({ ...prev, level: value }))}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Ajouter</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Skills by Category */}
        <div className="space-y-6">
          {groupedSkills.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.value} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${category.color} bg-current/10`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {category.label}
                    <Badge variant="secondary" className="ml-auto">
                      {category.skills.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {category.skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div 
                          key={skill.id} 
                          className="p-4 rounded-lg border hover:bg-muted/50 transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms` }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{skill.icon}</span>
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {skill.name}
                                </h3>
                                <span className="text-sm text-muted-foreground">
                                  {getLevelText(skill.level)}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Niveau</span>
                              <span className="font-medium">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${getLevelColor(skill.level)}`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Aucune compétence dans cette catégorie
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;