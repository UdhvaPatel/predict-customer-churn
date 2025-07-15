import { CheckCircle, AlertTriangle, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "./CircularProgress";

interface PredictionResult {
  prediction: number;
  probability: number;
  riskFactors?: string[];
  recommendations?: string[];
}

interface ResultsSectionProps {
  result: PredictionResult;
}

export default function ResultsSection({ result }: ResultsSectionProps) {
  const isChurn = result.prediction === 1;
  const percentage = Math.round(result.probability * 100);

  return (
    <section className="py-16 px-4 animate-fade-in" id="results">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-card shadow-soft border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Prediction Results
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Analysis complete – here's what our model predicts
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-4">
                {isChurn ? (
                  <AlertTriangle className="w-8 h-8 text-warning" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-success" />
                )}
                <h2 className="text-2xl md:text-3xl font-bold">
                  {isChurn ? (
                    <span className="text-warning">⚠️ This customer is likely to churn</span>
                  ) : (
                    <span className="text-success">✅ This customer is likely to stay</span>
                  )}
                </h2>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <CircularProgress
                  percentage={percentage}
                  size={150}
                  strokeWidth={12}
                  color={isChurn ? "#F59E0B" : "#059669"}
                  duration={1500}
                />
                <p className="text-lg text-muted-foreground">
                  {isChurn ? "Churn" : "Retention"} Probability
                </p>
              </div>
            </div>

            {isChurn && result.riskFactors && result.riskFactors.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5 text-warning" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Top Risk Factors
                  </h3>
                </div>

                <div className="grid gap-3">
                  {result.riskFactors.slice(0, 3).map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg"
                    >
                      <Badge variant="outline" className="bg-warning/20 text-warning border-warning/40">
                        {index + 1}
                      </Badge>
                      <span className="text-foreground font-medium">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <span>💡</span>
                <span>Recommendations</span>
              </h3>

              {result.recommendations && result.recommendations.length > 0 && (
                <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              )}

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
