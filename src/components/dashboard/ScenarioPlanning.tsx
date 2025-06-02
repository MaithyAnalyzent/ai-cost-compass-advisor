
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Zap, Building } from "lucide-react";

interface ScenarioPlanningProps {
  businessData: any;
}

const ScenarioPlanning = ({ businessData }: ScenarioPlanningProps) => {
  const scenarios = [
    {
      name: "Conservative Growth",
      description: "25% increase in AI usage over 12 months",
      timeframe: "12 months",
      cost: "$78,000",
      savings: "$32,000",
      roi: "185%",
      risks: "Low",
      details: {
        newDepartments: ["Legal", "Procurement"],
        scalingFactor: 1.25,
        additionalFTEs: 2,
        newUseCases: ["Document review", "Contract analysis"]
      }
    },
    {
      name: "Aggressive Expansion",
      description: "100% increase in AI usage, full automation push",
      timeframe: "18 months",
      cost: "$145,000",
      savings: "$89,000",
      roi: "320%",
      risks: "Medium",
      details: {
        newDepartments: ["Legal", "Procurement", "R&D", "Quality Assurance"],
        scalingFactor: 2.0,
        additionalFTEs: 6,
        newUseCases: ["Research automation", "Quality control", "Predictive analytics"]
      }
    },
    {
      name: "Department-by-Department",
      description: "Gradual rollout, one department every 3 months",
      timeframe: "24 months",
      cost: "$95,000",
      savings: "$54,000",
      roi: "240%",
      risks: "Very Low",
      details: {
        newDepartments: ["Legal", "Procurement", "R&D"],
        scalingFactor: 1.6,
        additionalFTEs: 4,
        newUseCases: ["Legal research", "Vendor analysis", "Innovation tracking"]
      }
    }
  ];

  const modelChanges = [
    {
      scenario: "Switch to open-source models",
      impact: "60% cost reduction",
      tradeoff: "5-10% quality decrease",
      recommendation: "Consider for non-critical applications"
    },
    {
      scenario: "Hybrid cloud deployment",
      impact: "30% cost reduction",
      tradeoff: "Increased complexity",
      recommendation: "Good for data-sensitive workloads"
    },
    {
      scenario: "Fine-tuned domain models",
      impact: "40% better performance",
      tradeoff: "Higher initial investment",
      recommendation: "Ideal for specialized use cases"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {scenarios.map((scenario, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {scenario.name}
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </div>
                <Badge variant={scenario.risks === 'Low' ? 'default' : scenario.risks === 'Medium' ? 'secondary' : 'outline'}>
                  {scenario.risks} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Financial Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-sm text-gray-600">Total Cost</div>
                      <div className="text-lg font-semibold text-red-600">{scenario.cost}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Total Savings</div>
                      <div className="text-lg font-semibold text-green-600">{scenario.savings}</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Expected ROI</div>
                    <div className="text-2xl font-bold text-blue-600">{scenario.roi}</div>
                    <div className="text-sm text-gray-600">over {scenario.timeframe}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Implementation Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">New Departments</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {scenario.details.newDepartments.map((dept, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Additional Staff</div>
                      <div className="font-medium">{scenario.details.additionalFTEs} FTEs</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Scaling Factor</div>
                      <div className="font-medium">{scenario.details.scalingFactor}x current usage</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">New Use Cases</h5>
                <div className="flex flex-wrap gap-2">
                  {scenario.details.newUseCases.map((useCase, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline">
                  Generate Detailed Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Model Strategy Scenarios
          </CardTitle>
          <CardDescription>
            Alternative model deployment strategies and their implications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelChanges.map((change, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{change.scenario}</h4>
                  <Badge className="bg-blue-100 text-blue-800">{change.impact}</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Trade-off: </span>
                    <span>{change.tradeoff}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Recommendation: </span>
                    <span>{change.recommendation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioPlanning;
