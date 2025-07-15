import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-8 px-4 mt-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/udhva-patel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            
            <a
              href="https://linkedin.com/in/udhva-patel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
          
          <p className="text-muted-foreground flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Udhva Patel</span>
          </p>
          
          <p className="text-sm text-muted-foreground/70">
            © 2024 Customer Churn Predictor. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}