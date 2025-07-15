import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import PredictionForm from "@/components/PredictionForm";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";

interface PredictionResult {
  prediction: number;
  probability: number;
  riskFactors?: string[];
}

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handlePredictionResult = (result: PredictionResult) => {
    setPredictionResult(result);
    
    // Scroll to results after a short delay to allow state update
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Prediction Form */}
      <div ref={formRef}>
        <PredictionForm onPredictionResult={handlePredictionResult} />
      </div>
      
      {/* Results Section */}
      {predictionResult && (
        <div ref={resultsRef}>
          <ResultsSection result={predictionResult} />
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
