
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calculator } from "lucide-react";

interface CostAnalysisProps {
  businessData: any;
}

const CostAnalysis = ({ businessData }: CostAnalysisProps) => {
  const costData = [
    {
      category: "Customer Support",
      current: "$28,000",
      optimized: "$15,000",
      savings: "$13,000",
      percentage: 46
    },
    {
      category: "Content Generation",
      current: "$12,000",
      optimized: "$8,500",
      savings: "$3,500",
      percentage: 29
    },
    {
      category: "Data Analysis",
      current: "$18,000",
      optimized: "$11,000",
      savings: "$7,000",
      percentage: 39
    },
    {
      category: "Code Generation",
      current: "$9,000",
      optimized: "$6,200",
      savings: "$2,800",
      percentage: 31
    }
  ];

  const roiMetrics = [
    { label: "Break-even Period", value: "4.2 months", trend: "down" },
    { label: "Annual ROI", value: "285%", trend: "up" },
    { label: "Implementation Cost", value: "$25,000", trend: "neutral" },
    { label: "Monthly Savings", value: "$26,300", trend: "up" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roiMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                  {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-600" />}
                  {metric.trend === 'neutral' && <DollarSign className="h-4 w-4 text-blue-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Cost Breakdown by Department
          </CardTitle>
          <CardDescription>
            Comparison of current costs vs optimized AI implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.category}</h4>
                  <Badge className="bg-green-100 text-green-800">
                    {item.percentage}% savings
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Current Cost</p>
                    <p className="font-semibold text-red-600">{item.current}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Optimized Cost</p>
                    <p className="font-semibold text-blue-600">{item.optimized}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Savings</p>
                    <p className="font-semibold text-green-600">{item.savings}</p>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Human vs AI Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Customer Support (FTE)</span>
                <span className="font-semibold">$85,000/year</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span>AI-Powered Support</span>
                <span className="font-semibold text-blue-600">$18,000/year</span>
              </div>
              <div className="text-center text-green-600 font-semibold">
                78% cost reduction per equivalent role
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Credit Usage Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Current Token Usage</span>
                <span>2.4M tokens/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Optimized Usage</span>
                <span className="text-green-600">1.6M tokens/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Efficiency Gain</span>
                <Badge className="bg-green-100 text-green-800">33% reduction</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostAnalysis;
