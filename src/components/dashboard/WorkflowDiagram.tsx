
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Workflow, Brain, ArrowRight, Database, Cloud, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkflowDiagramProps {
  businessData: any;
}

const WorkflowDiagram = ({ businessData }: WorkflowDiagramProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const workflowSteps = [
    {
      id: 1,
      title: "Data Ingestion",
      description: "Customer inquiries, documents, emails",
      tools: ["API Gateway", "Webhook Listeners"],
      llms: [],
      icon: Database,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 2,
      title: "Content Processing",
      description: "Text analysis, document parsing",
      tools: ["Document Parser", "Text Classifier"],
      llms: ["Claude 3.5 Sonnet", "GPT-4o-mini"],
      icon: Brain,
      color: "bg-green-100 text-green-700"
    },
    {
      id: 3,
      title: "AI Analysis",
      description: "Sentiment analysis, intent classification",
      tools: ["Sentiment Analyzer", "Intent Classifier"],
      llms: ["Mistral 7B", "Groq Llama"],
      icon: Settings,
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: 4,
      title: "Decision Making",
      description: "Route to appropriate department/agent",
      tools: ["Decision Engine", "Priority Scorer"],
      llms: ["GPT-4o", "Claude 3.5 Sonnet"],
      icon: ArrowRight,
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: 5,
      title: "Response Generation",
      description: "Generate personalized responses",
      tools: ["Response Generator", "Template Engine"],
      llms: ["GPT-4o", "Claude 3.5 Sonnet"],
      icon: Cloud,
      color: "bg-teal-100 text-teal-700"
    },
    {
      id: 6,
      title: "Human Handoff",
      description: "Escalate complex cases to human agents",
      tools: ["CRM Integration", "Ticketing System"],
      llms: [],
      icon: Users,
      color: "bg-red-100 text-red-700"
    }
  ];

  const generateDiagram = async () => {
    setIsGenerating(true);
    
    // Create SVG workflow diagram
    const svg = createWorkflowSVG();
    
    // Convert to downloadable image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      // Download as PNG
      const link = document.createElement('a');
      link.download = `${businessData?.companyName || 'Enterprise'}_AI_Workflow.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      setIsGenerating(false);
      toast({
        title: "Workflow Diagram Generated",
        description: "Your AI workflow diagram has been downloaded successfully",
      });
    };
    
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  };

  const createWorkflowSVG = () => {
    const width = 1200;
    const height = 800;
    const stepWidth = 180;
    const stepHeight = 120;
    const margin = 50;
    
    let svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
        
        <!-- Title -->
        <text x="${width/2}" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1e293b">
          ${businessData?.companyName || 'Enterprise'} AI Workflow Pipeline
        </text>
    `;

    // Draw workflow steps
    workflowSteps.forEach((step, index) => {
      const x = margin + (index % 3) * (stepWidth + 40);
      const y = 100 + Math.floor(index / 3) * (stepHeight + 60);
      
      // Step box
      svg += `
        <rect x="${x}" y="${y}" width="${stepWidth}" height="${stepHeight}" 
              rx="8" fill="white" stroke="#e2e8f0" stroke-width="2" />
        
        <!-- Step number -->
        <circle cx="${x + 20}" cy="${y + 20}" r="12" fill="#3b82f6" />
        <text x="${x + 20}" y="${y + 25}" text-anchor="middle" font-family="Arial" font-size="12" fill="white">${step.id}</text>
        
        <!-- Step title -->
        <text x="${x + 40}" y="${y + 25}" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">${step.title}</text>
        
        <!-- Description -->
        <text x="${x + 10}" y="${y + 45}" font-family="Arial" font-size="11" fill="#64748b">
          ${step.description.length > 25 ? step.description.substring(0, 25) + '...' : step.description}
        </text>
      `;
      
      // Tools
      if (step.tools.length > 0) {
        svg += `<text x="${x + 10}" y="${y + 65}" font-family="Arial" font-size="10" fill="#059669" font-weight="bold">Tools:</text>`;
        step.tools.forEach((tool, i) => {
          svg += `<text x="${x + 10}" y="${y + 80 + i * 12}" font-family="Arial" font-size="9" fill="#059669">• ${tool}</text>`;
        });
      }
      
      // LLMs
      if (step.llms.length > 0) {
        const llmY = y + 65 + (step.tools.length * 12) + (step.tools.length > 0 ? 15 : 0);
        svg += `<text x="${x + 10}" y="${llmY}" font-family="Arial" font-size="10" fill="#7c3aed" font-weight="bold">LLMs:</text>`;
        step.llms.forEach((llm, i) => {
          svg += `<text x="${x + 10}" y="${llmY + 15 + i * 12}" font-family="Arial" font-size="9" fill="#7c3aed">• ${llm}</text>`;
        });
      }
      
      // Draw arrows between steps
      if (index < workflowSteps.length - 1) {
        const nextIndex = index + 1;
        const nextX = margin + (nextIndex % 3) * (stepWidth + 40);
        const nextY = 100 + Math.floor(nextIndex / 3) * (stepHeight + 60);
        
        if (Math.floor(index / 3) === Math.floor(nextIndex / 3)) {
          // Same row - horizontal arrow
          svg += `
            <path d="M ${x + stepWidth} ${y + stepHeight/2} L ${nextX - 10} ${nextY + stepHeight/2}" 
                  stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
          `;
        } else if (index % 3 === 2) {
          // End of row - vertical arrow to next row
          svg += `
            <path d="M ${x + stepWidth/2} ${y + stepHeight} L ${nextX + stepWidth/2} ${nextY - 10}" 
                  stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
          `;
        }
      }
    });
    
    // Arrow marker definition
    svg += `
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
        </marker>
      </defs>
    `;
    
    // Legend
    svg += `
      <rect x="${width - 200}" y="${height - 150}" width="180" height="120" fill="white" stroke="#e2e8f0" stroke-width="1" rx="4" />
      <text x="${width - 190}" y="${height - 130}" font-family="Arial" font-size="12" font-weight="bold" fill="#1e293b">Legend</text>
      <circle cx="${width - 180}" cy="${height - 110}" r="4" fill="#059669" />
      <text x="${width - 170}" y="${height - 106}" font-family="Arial" font-size="10" fill="#059669">AI Tools</text>
      <circle cx="${width - 180}" cy="${height - 90}" r="4" fill="#7c3aed" />
      <text x="${width - 170}" y="${height - 86}" font-family="Arial" font-size="10" fill="#7c3aed">LLM Models</text>
      <circle cx="${width - 180}" cy="${height - 70}" r="4" fill="#3b82f6" />
      <text x="${width - 170}" y="${height - 66}" font-family="Arial" font-size="10" fill="#3b82f6">Process Flow</text>
      
      <text x="${width - 190}" y="${height - 40}" font-family="Arial" font-size="8" fill="#64748b">
        Generated by AI Cost Optimization Advisor
      </text>
    `;
    
    svg += '</svg>';
    return svg;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            AI Workflow Pipeline Generator
          </CardTitle>
          <CardDescription>
            Visual representation of your enterprise AI workflow with recommended tools and LLMs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Enterprise: {businessData?.companyName}</h3>
              <p className="text-sm text-gray-600">Industry: {businessData?.industry} | Size: {businessData?.companySize}</p>
            </div>
            <Button 
              onClick={generateDiagram} 
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Download Workflow Diagram'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflowSteps.map((step, index) => (
              <Card key={step.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {step.tools.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-green-700 mb-1">AI Tools:</p>
                      <div className="flex flex-wrap gap-1">
                        {step.tools.map((tool, i) => (
                          <Badge key={i} variant="outline" className="text-xs text-green-700 border-green-200">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {step.llms.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-purple-700 mb-1">LLMs:</p>
                      <div className="flex flex-wrap gap-1">
                        {step.llms.map((llm, i) => (
                          <Badge key={i} variant="outline" className="text-xs text-purple-700 border-purple-200">
                            {llm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 hidden lg:block">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Workflow Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{workflowSteps.length}</div>
              <div className="text-sm text-gray-600">Process Steps</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {workflowSteps.reduce((acc, step) => acc + step.tools.length, 0)}
              </div>
              <div className="text-sm text-gray-600">AI Tools</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {[...new Set(workflowSteps.flatMap(step => step.llms))].length}
              </div>
              <div className="text-sm text-gray-600">Unique LLMs</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <div className="text-sm text-gray-600">Automation Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowDiagram;
