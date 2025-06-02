
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Workflow, ArrowRight, Bot, Users, Zap, Clock } from "lucide-react";

interface WorkflowAnalysisProps {
  businessData: any;
}

const WorkflowAnalysis = ({ businessData }: WorkflowAnalysisProps) => {
  const workflowMappings = [
    {
      department: "Customer Support",
      currentProcess: "Manual ticket triage → Human agent response → Escalation if needed",
      proposedProcess: "AI-powered ticket classification → Automated responses for common issues → Human handoff for complex cases",
      automationOpportunities: [
        "Ticket classification and routing",
        "FAQ responses and documentation lookup",
        "Sentiment analysis and priority scoring",
        "Response drafting for agents"
      ],
      efficiency: 78,
      timeReduction: "4.2 hours/day",
      costImpact: "$12,000/month savings"
    },
    {
      department: "Sales",
      currentProcess: "Lead qualification → Manual research → Pitch preparation → Follow-up tracking",
      proposedProcess: "AI lead scoring → Automated research compilation → AI-assisted pitch generation → Smart follow-up scheduling",
      automationOpportunities: [
        "Lead scoring and qualification",
        "Company and contact research",
        "Personalized email generation",
        "Meeting summary and next steps"
      ],
      efficiency: 65,
      timeReduction: "3.8 hours/day",
      costImpact: "$8,500/month savings"
    },
    {
      department: "Marketing",
      currentProcess: "Content planning → Manual writing → Design coordination → Campaign management",
      proposedProcess: "AI content strategy → Automated content generation → AI-powered design suggestions → Intelligent campaign optimization",
      automationOpportunities: [
        "Content ideation and planning",
        "Blog post and social media generation",
        "A/B test copy variations",
        "Performance analysis and optimization"
      ],
      efficiency: 72,
      timeReduction: "5.1 hours/day",
      costImpact: "$9,200/month savings"
    },
    {
      department: "HR",
      currentProcess: "Job posting → Resume screening → Interview scheduling → Candidate evaluation",
      proposedProcess: "AI job description optimization → Automated resume screening → Smart scheduling → AI-assisted evaluation",
      automationOpportunities: [
        "Resume parsing and ranking",
        "Interview question generation",
        "Candidate communication",
        "Onboarding documentation"
      ],
      efficiency: 58,
      timeReduction: "2.9 hours/day",
      costImpact: "$6,100/month savings"
    }
  ];

  const integrationPoints = [
    {
      system: "CRM (Salesforce)",
      integrations: ["Lead scoring", "Contact enrichment", "Opportunity analysis"],
      complexity: "Medium",
      timeline: "4-6 weeks"
    },
    {
      system: "Help Desk (Zendesk)",
      integrations: ["Ticket classification", "Auto-responses", "Sentiment tracking"],
      complexity: "Low",
      timeline: "2-3 weeks"
    },
    {
      system: "Marketing Automation (HubSpot)",
      integrations: ["Content generation", "Email personalization", "Campaign optimization"],
      complexity: "Medium",
      timeline: "3-4 weeks"
    },
    {
      system: "HRIS (Workday)",
      integrations: ["Resume screening", "Candidate matching", "Performance analysis"],
      complexity: "High",
      timeline: "6-8 weeks"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            Workflow Optimization Overview
          </CardTitle>
          <CardDescription>
            AI integration opportunities across your business processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-sm text-gray-600">Automation Points</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">68%</div>
              <div className="text-sm text-gray-600">Avg Efficiency Gain</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">16h</div>
              <div className="text-sm text-gray-600">Daily Time Savings</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">$35.8K</div>
              <div className="text-sm text-gray-600">Monthly Savings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {workflowMappings.map((workflow, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {workflow.department}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    {workflow.efficiency}% efficiency
                  </Badge>
                  <Badge variant="outline">
                    {workflow.timeReduction} saved
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Current Process
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                      <p className="text-sm text-gray-700">{workflow.currentProcess}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI-Optimized Process
                    </h4>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-gray-700">{workflow.proposedProcess}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Automation Opportunities
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {workflow.automationOpportunities.map((opportunity, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                        <ArrowRight className="h-3 w-3 text-purple-600" />
                        <span className="text-sm">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Expected Impact</div>
                    <div className="font-semibold text-green-600">{workflow.costImpact}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Generate Implementation Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>System Integration Requirements</CardTitle>
          <CardDescription>
            Technical integration points and implementation timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationPoints.map((integration, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{integration.system}</h4>
                  <div className="flex gap-2">
                    <Badge variant={integration.complexity === 'Low' ? 'default' : integration.complexity === 'Medium' ? 'secondary' : 'destructive'}>
                      {integration.complexity} complexity
                    </Badge>
                    <Badge variant="outline">{integration.timeline}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {integration.integrations.map((item, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAnalysis;
