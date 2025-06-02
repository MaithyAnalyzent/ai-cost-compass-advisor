import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Shield, 
  Users, 
  Workflow,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  PieChart
} from "lucide-react";
import CostAnalysis from "@/components/dashboard/CostAnalysis";
import ModelRecommendations from "@/components/dashboard/ModelRecommendations";
import ScenarioPlanning from "@/components/dashboard/ScenarioPlanning";
import RiskAssessment from "@/components/dashboard/RiskAssessment";
import WorkflowAnalysis from "@/components/dashboard/WorkflowAnalysis";
import WorkflowDiagram from "@/components/dashboard/WorkflowDiagram";
import Infographics from "@/components/dashboard/Infographics";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  businessData: any;
  onBack: () => void;
}

const Dashboard = ({ businessData, onBack }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleExport = (type: 'pdf' | 'csv' | 'json') => {
    toast({
      title: "Export Started",
      description: `Your ${type.toUpperCase()} report is being generated...`,
    });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "infographics", label: "Infographics", icon: PieChart },
    { id: "costs", label: "Cost Analysis", icon: DollarSign },
    { id: "models", label: "Model Selection", icon: Brain },
    { id: "scenarios", label: "Scenarios", icon: TrendingUp },
    { id: "risks", label: "Risk Assessment", icon: Shield },
    { id: "workflow", label: "Workflow", icon: Workflow },
    { id: "diagram", label: "AI Pipeline", icon: Workflow },
  ];

  const summaryMetrics = [
    {
      title: "Potential Savings",
      value: "$45,000",
      subtitle: "per month",
      trend: "+38%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: TrendingUp
    },
    {
      title: "ROI Timeline",
      value: "4.2",
      subtitle: "months to break even",
      trend: "-2.1 months",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: Clock
    },
    {
      title: "Risk Score",
      value: "Low",
      subtitle: "implementation risk",
      trend: "3/10",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: Shield
    },
    {
      title: "Model Efficiency",
      value: "92%",
      subtitle: "optimization potential",
      trend: "+15%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: Brain
    }
  ];

  const keyRecommendations = [
    {
      title: "Switch to Claude 3.5 Sonnet for customer support",
      impact: "Save $12,000/month",
      priority: "High",
      effort: "Low"
    },
    {
      title: "Implement Groq for real-time chat applications",
      impact: "Reduce latency by 80%",
      priority: "High",
      effort: "Medium"
    },
    {
      title: "Optimize token usage with prompt engineering",
      impact: "Save $8,000/month",
      priority: "Medium",
      effort: "Low"
    },
    {
      title: "Deploy Mistral 7B for internal documentation",
      impact: "Save $5,000/month",
      priority: "Medium",
      effort: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                AI Cost Analysis for {businessData?.companyName}
              </h1>
              <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white/80 backdrop-blur-sm">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {summaryMetrics.map((metric, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                        <p className="text-sm text-gray-500">{metric.subtitle}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Badge variant="outline" className={`${metric.color} border-current`}>
                        {metric.trend}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Recommendations */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Key Recommendations
                </CardTitle>
                <CardDescription>
                  Top optimization opportunities based on your analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.impact}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="outline">
                          {rec.effort} effort
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Context */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Business Context</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Company Details</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>Industry: {businessData?.industry}</li>
                      <li>Size: {businessData?.companySize}</li>
                      <li>Budget: {businessData?.monthlyBudget}</li>
                      <li>Maturity: {businessData?.maturityLevel}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">AI Usage</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>Departments: {businessData?.departments?.join(', ')}</li>
                      <li>Goals: {businessData?.goals?.join(', ')}</li>
                      <li>Platforms: {businessData?.preferredPlatforms?.join(', ')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infographics">
            <Infographics businessData={businessData} />
          </TabsContent>

          <TabsContent value="costs">
            <CostAnalysis businessData={businessData} />
          </TabsContent>

          <TabsContent value="models">
            <ModelRecommendations businessData={businessData} />
          </TabsContent>

          <TabsContent value="scenarios">
            <ScenarioPlanning businessData={businessData} />
          </TabsContent>

          <TabsContent value="risks">
            <RiskAssessment businessData={businessData} />
          </TabsContent>

          <TabsContent value="workflow">
            <WorkflowAnalysis businessData={businessData} />
          </TabsContent>

          <TabsContent value="diagram">
            <WorkflowDiagram businessData={businessData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
