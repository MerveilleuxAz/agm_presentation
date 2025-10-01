import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulation d'inscription (sera remplacé par Supabase)
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      toast({
        title: "Inscription réussie !",
        description: "Merci pour votre inscription à ma newsletter.",
      });
      
      // Reset après 3 secondes
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-card rounded-lg p-6 text-center animate-fade-in">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Merci pour votre inscription !
        </h3>
        <p className="text-muted-foreground text-sm">
          Vous recevrez bientôt mes dernières actualités et projets.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Newsletter</h3>
          <p className="text-muted-foreground text-sm">
            Restez informé de mes derniers projets
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-foreground">
        <Input
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Inscription...
            </div>
          ) : (
            'S\'abonner'
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Aucun spam. Désinscription facile à tout moment.
      </p>
    </div>
  );
};

export default Newsletter;