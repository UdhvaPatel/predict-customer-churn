import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import TooltipWrapper from "./ToolTipWrapper";

interface FormData {
  tenure: string;
  monthlyCharges: string;
  totalCharges: string;
  contractType: string;
  internetService: string;
  onlineSecurity: string;
  techSupport: string;
  paperlessBilling: string;
  hasPartner: string;
  paymentMethod: string;
}

interface PredictionFormProps {
  onPredictionResult: (result: any) => void;
}

export default function PredictionForm({ onPredictionResult }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    tenure: "",
    monthlyCharges: "",
    totalCharges: "",
    contractType: "",
    internetService: "",
    onlineSecurity: "",
    techSupport: "",
    paperlessBilling: "",
    hasPartner: "",
    paymentMethod: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const payload = {
    tenure: Number(formData.tenure),
    MonthlyCharges: Number(formData.monthlyCharges),
    TotalCharges: Number(formData.totalCharges),
    Contract:
      formData.contractType === "month-to-month"
        ? "Month-to-month"
        : formData.contractType === "one-year"
        ? "One year"
        : "Two year",
    InternetService: formData.internetService === "yes" ? "DSL" : "No",
    OnlineSecurity: formData.onlineSecurity === "yes" ? "Yes" : "No",
    TechSupport: formData.techSupport === "yes" ? "Yes" : "No",
    PaperlessBilling: formData.paperlessBilling === "yes" ? "Yes" : "No",
    Partner: formData.hasPartner === "yes" ? "Yes" : "No",
    PaymentMethod: (() => {
      switch (formData.paymentMethod) {
        case "credit-card":
          return "Credit card (automatic)";
        case "bank-transfer":
          return "Bank transfer (automatic)";
        case "electronic-check":
          return "Electronic check";
        case "mailed-check":
          return "Mailed check";
        default:
          return "Electronic check";
      }
    })(),
    gender: "Male",
    PhoneService: "Yes",
    MultipleLines: "No",
    Dependents: "No",
    SeniorCitizen: 0
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, payload);

    // 🧠 Dynamically generate risk factors based on form input
    const riskFactors: string[] = [];
    if (Number(formData.monthlyCharges) > 80) riskFactors.push("High monthly charges");
    if (formData.contractType === "month-to-month") riskFactors.push("Month-to-month contract");
    if (formData.techSupport === "no") riskFactors.push("No tech support");
    if (formData.onlineSecurity === "no") riskFactors.push("No online security");

    // const formattedResult = {
    //   prediction: response.data.churn,
    //   probability: response.data.probability,
    //   riskFactors
    // };
    // 💡 Dynamic recommendations based on churn or not
    const isChurn = response.data.churn === 1;

    const recommendations: string[] = isChurn
      ? [
          "Reach out with personalized retention offers",
          "Consider discounts or bundling packages",
          "Improve support experience and address common pain points"
        ]
      : [
          "Consider upselling premium features",
          "Use this customer in referral or testimonial programs",
          "Continue providing consistent service quality"
        ];

    const formattedResult = {
      prediction: response.data.churn,
      probability: response.data.probability,
      riskFactors,
      recommendations
    };

    onPredictionResult(formattedResult);
  } catch (error) {
    console.error("Prediction failed:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  const isFormValid = Object.values(formData).every(value => value !== "");

  return (
    <section className="py-16 px-4" id="prediction-form">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-card shadow-soft border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Customer Information
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Enter the customer details to predict churn probability
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tenure */}
                <div className="space-y-2">
                  <TooltipWrapper content="How long the customer has been with your service in months">
                    <Label htmlFor="tenure" className="text-sm font-medium flex items-center gap-1">
                      Tenure (months) <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="e.g., 24"
                    value={formData.tenure}
                    onChange={(e) => handleInputChange('tenure', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                {/* Monthly Charges */}
                <div className="space-y-2">
                  <TooltipWrapper content="Recurring monthly fee billed to the customer">
                    <Label htmlFor="monthlyCharges" className="text-sm font-medium flex items-center gap-1">
                      Monthly Charges ($) <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <Input
                    id="monthlyCharges"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 65.50"
                    value={formData.monthlyCharges}
                    onChange={(e) => handleInputChange('monthlyCharges', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                {/* Total Charges */}
                <div className="space-y-2">
                  <TooltipWrapper content="Total amount the customer has paid to date">
                    <Label htmlFor="totalCharges" className="text-sm font-medium flex items-center gap-1">
                      Total Charges ($) <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <Input
                    id="totalCharges"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 1572.00"
                    value={formData.totalCharges}
                    onChange={(e) => handleInputChange('totalCharges', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                {/* Contract Type */}
                <div className="space-y-2">
                  <TooltipWrapper content="Longer contracts often lead to lower churn rates">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Contract Type <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <Select value={formData.contractType} onValueChange={(value) => handleInputChange('contractType', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month-to-month">Month-to-month</SelectItem>
                      <SelectItem value="one-year">One year</SelectItem>
                      <SelectItem value="two-year">Two year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Internet Service */}
                <div className="space-y-3">
                  <TooltipWrapper content="Indicates whether the customer has active internet service">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Internet Service <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <RadioGroup 
                    value={formData.internetService} 
                    onValueChange={(value) => handleInputChange('internetService', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="internet-yes" />
                      <Label htmlFor="internet-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="internet-no" />
                      <Label htmlFor="internet-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Online Security */}
                <div className="space-y-3">
                  <TooltipWrapper content="Shows if customer has online protection features enabled">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Online Security <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <RadioGroup 
                    value={formData.onlineSecurity} 
                    onValueChange={(value) => handleInputChange('onlineSecurity', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="security-yes" />
                      <Label htmlFor="security-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="security-no" />
                      <Label htmlFor="security-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Tech Support */}
                <div className="space-y-3">
                  <TooltipWrapper content="Access to tech support may reduce likelihood of churn">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Tech Support <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <RadioGroup 
                    value={formData.techSupport} 
                    onValueChange={(value) => handleInputChange('techSupport', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="tech-yes" />
                      <Label htmlFor="tech-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="tech-no" />
                      <Label htmlFor="tech-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Paperless Billing */}
                <div className="space-y-3">
                  <TooltipWrapper content="Indicates whether the customer receives digital bills only">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Paperless Billing <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <RadioGroup 
                    value={formData.paperlessBilling} 
                    onValueChange={(value) => handleInputChange('paperlessBilling', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="paperless-yes" />
                      <Label htmlFor="paperless-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="paperless-no" />
                      <Label htmlFor="paperless-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Has Partner */}
                <div className="space-y-3">
                  <TooltipWrapper content="Married customers tend to have lower churn rates">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Has Partner <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <RadioGroup 
                    value={formData.hasPartner} 
                    onValueChange={(value) => handleInputChange('hasPartner', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="partner-yes" />
                      <Label htmlFor="partner-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="partner-no" />
                      <Label htmlFor="partner-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <TooltipWrapper content="Certain payment types (e.g., auto-pay) may affect churn risk">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Payment Method <span className="text-xs text-muted-foreground">(?)</span>
                    </Label>
                  </TooltipWrapper>

                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="electronic-check">Electronic Check</SelectItem>
                      <SelectItem value="mailed-check">Mailed Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  disabled={!isFormValid || isLoading}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-12 py-6 rounded-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 w-5 h-5" />
                      Predict Churn
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
