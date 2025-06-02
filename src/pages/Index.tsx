import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, TrendingUp, Users, Shield, Zap, BarChart3 } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'dashboard'>('landing');
  const [businessData, setBusinessData] = useState<any>(null);

  const features = [
    {
      icon: Brain,
      title: "Multi-Agent Analysis",
      description: "14 specialized AI agents analyze your business needs, costs, and optimization opportunities",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "ROI Optimization",
      description: "Compare AI vs human costs with detailed breakeven analysis and projected returns",
      color: "text-green-600"
    },
    {
      icon: BarChart3,
      title: "Model Selection",
      description: "Get recommendations for optimal LLMs per use case with cost-latency tradeoffs",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify security, compliance, and operational risks with mitigation strategies",
      color: "text-red-600"
    },
    {
      icon: Users,
      title: "Change Management",
      description: "Strategic planning for human adoption and organizational transformation",
      color: "text-orange-600"
    },
    {
      icon: Zap,
      title: "Credit Tracking",
      description: "Monitor token usage, optimize consumption, and reduce unnecessary spend",
      color: "text-yellow-600"
    }
  ];

  const handleChatComplete = (data: any) => {
    setBusinessData(data);
    setCurrentView('dashboard');
  };

  if (currentView === 'chat') {
    return <ChatInterface onComplete={handleChatComplete} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard businessData={businessData} onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
            Enterprise AI Cost Optimization
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI Cost Optimization Advisor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Make data-driven decisions about AI deployment with our 14-agent analysis system. 
            Get ROI projections, model recommendations, and credit optimization strategies tailored to your enterprise.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('chat')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-white to-gray-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-0">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">14</div>
              <div className="text-gray-600 font-medium">AI Agents</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">85%</div>
              <div className="text-gray-600 font-medium">Cost Reduction</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-600 font-medium">Models Analyzed</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-gray-600 font-medium">Monitoring</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Optimize Your AI Costs?</h2>
          <p className="text-lg text-gray-600 mb-8">Get your comprehensive analysis in minutes, not weeks.</p>
          <Button 
            size="lg" 
            onClick={() => setCurrentView('chat')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Your Free Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
