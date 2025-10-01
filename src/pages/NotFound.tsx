import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Code2, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-wine/5 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-wine/10 animate-bounce delay-1000">
          <Code2 size={60} />
        </div>
        <div className="absolute bottom-32 right-20 text-wine/10 animate-pulse delay-500">
          <Zap size={40} />
        </div>
        <div className="absolute top-1/3 right-10 text-wine/10 animate-bounce delay-700">
          <AlertCircle size={50} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-wine/10 animate-pulse delay-300">
          <Code2 size={35} />
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto relative z-10">
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-black text-wine mb-4 animate-fade-in glitch-text">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-wine/20 animate-pulse glitch-text-shadow">
            404
          </div>
        </div>

        {/* Main message */}
        <div className="mb-8 animate-fade-in-delay-200">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops ! Page introuvable
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Cette page semble avoir été déployée sur Mars... 🚀
            <br />
            <span className="text-wine font-medium">
              Même les meilleurs développeurs perdent parfois leurs routes !
            </span>
          </p>
        </div>

        {/* Animated robot/developer illustration */}
        <div className="mb-8 animate-fade-in-delay-400">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-wine/10 rounded-full border-2 border-wine/20 relative">
            <div className="animate-bounce">
              <Code2 size={60} className="text-wine" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full animate-pulse flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center animate-fade-in-delay-600">
          <Button asChild variant="default" size="lg" className="w-full md:w-auto">
            <Link to="/" className="inline-flex items-center gap-2">
              <Home size={20} />
              Retour à l'accueil
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
            <Link to="/#projects" className="inline-flex items-center gap-2">
              <Code2 size={20} />
              Voir mes projets
            </Link>
          </Button>
        </div>

        {/* Fun message */}
        <p className="text-sm text-muted-foreground mt-8 animate-fade-in-delay-800">
          <code className="bg-muted px-2 py-1 rounded text-wine">
            Error 404: Developer.find(page) === undefined
          </code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
