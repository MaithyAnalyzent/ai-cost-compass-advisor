
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, DollarSign, Clock } from "lucide-react";

interface ModelRecommendationsProps {
  businessData: any;
}

const ModelRecommendations = ({ businessData }: ModelRecommendationsProps) => {
  const modelRecommendations = [
    {
      useCase: "Customer Support",
      currentModel: "GPT-4",
      recommendedModel: "Claude 3.5 Sonnet",
      costPerMonth: "$15,000",
      savingsPerMonth: "$12,000",
      latency: "1.2s",
      quality: "95%",
      reasoning: "Superior performance for conversational tasks with 46% cost savings"
    },
    {
      useCase: "Content Generation",
      currentModel: "GPT-3.5 Turbo",
      recommendedModel: "Mistral 7B Instruct",
      costPerMonth: "$8,500",
      savingsPerMonth: "$3,500",
      latency: "0.8s",
      quality: "92%",
      reasoning: "Excellent creative writing capabilities at lower cost"
    },
    {
      useCase: "Code Generation",
      currentModel: "GPT-4",
      recommendedModel: "CodeLlama 34B",
      costPerMonth: "$6,200",
      savingsPerMonth: "$2,800",
      latency: "1.5s",
      quality: "94%",
      reasoning: "Specialized for coding tasks with better accuracy"
    },
    {
      useCase: "Real-time Chat",
      currentModel: "GPT-3.5 Turbo",
      recommendedModel: "Groq Mixtral 8x7B",
      costPerMonth: "$4,800",
      savingsPerMonth: "$1,200",
      latency: "0.3s",
      quality: "90%",
      reasoning: "Ultra-fast inference for real-time applications"
    }
  ];

  const benchmarkData = [
    {
      model: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      costPer1kTokens: "$0.015",
      qualityScore: 95,
      speed: "Fast",
      bestFor: "Conversational AI, Analysis"
    },
    {
      model: "GPT-4 Turbo",
      provider: "OpenAI",
      costPer1kTokens: "$0.030",
      qualityScore: 96,
      speed: "Medium",
      bestFor: "Complex reasoning, Writing"
    },
    {
      model: "Groq Mixtral 8x7B",
      provider: "Groq",
      costPer1kTokens: "$0.008",
      qualityScore: 90,
      speed: "Ultra-fast",
      bestFor: "Real-time applications"
    },
    {
      model: "Mistral 7B Instruct",
      provider: "Mistral AI",
      costPer1kTokens: "$0.012",
      qualityScore: 92,
      speed: "Fast",
      bestFor: "General purpose, Cost-effective"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Model Recommendations by Use Case
          </CardTitle>
          <CardDescription>
            Optimized model selection based on your specific requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {modelRecommendations.map((rec, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{rec.useCase}</h3>
                  <Badge className="bg-green-100 text-green-800">
                    Save ${rec.savingsPerMonth}/month
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium">{rec.currentModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recommended:</span>
                      <span className="font-medium text-blue-600">{rec.recommendedModel}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-sm text-gray-600">Cost</div>
                      <div className="font-semibold">{rec.costPerMonth}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-sm text-gray-600">Latency</div>
                      <div className="font-semibold">{rec.latency}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-sm text-gray-600">Quality</div>
                      <div className="font-semibold">{rec.quality}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">{rec.reasoning}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Model Comparison Table</CardTitle>
          <CardDescription>
            Comprehensive comparison of recommended models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Model</th>
                  <th className="text-left p-3">Provider</th>
                  <th className="text-left p-3">Cost/1K Tokens</th>
                  <th className="text-left p-3">Quality Score</th>
                  <th className="text-left p-3">Speed</th>
                  <th className="text-left p-3">Best For</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkData.map((model, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{model.model}</td>
                    <td className="p-3">{model.provider}</td>
                    <td className="p-3 font-mono">{model.costPer1kTokens}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span>{model.qualityScore}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${model.qualityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={model.speed === 'Ultra-fast' ? 'default' : 'secondary'}>
                        {model.speed}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{model.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelRecommendations;
