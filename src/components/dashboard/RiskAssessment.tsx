
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface RiskAssessmentProps {
  businessData: any;
}

const RiskAssessment = ({ businessData }: RiskAssessmentProps) => {
  const riskCategories = [
    {
      category: "Security & Compliance",
      level: "Medium",
      score: 6,
      color: "bg-yellow-500",
      risks: [
        {
          risk: "Data Privacy Compliance",
          level: "High",
          description: "GDPR/CCPA compliance requirements for AI processing",
          mitigation: "Implement data anonymization and consent management",
          status: "action-needed"
        },
        {
          risk: "Model Security",
          level: "Medium",
          description: "Potential for prompt injection or model manipulation",
          mitigation: "Input validation and output filtering",
          status: "planned"
        },
        {
          risk: "Data Leakage",
          level: "Low",
          description: "Risk of sensitive information in model outputs",
          mitigation: "Regular audit and sanitization protocols",
          status: "implemented"
        }
      ]
    },
    {
      category: "Operational",
      level: "Low",
      score: 3,
      color: "bg-green-500",
      risks: [
        {
          risk: "Service Availability",
          level: "Medium",
          description: "Dependency on external AI service providers",
          mitigation: "Multi-provider strategy and fallback systems",
          status: "planned"
        },
        {
          risk: "Cost Overruns",
          level: "Low",
          description: "Unexpected increases in usage and costs",
          mitigation: "Usage monitoring and automated alerts",
          status: "implemented"
        },
        {
          risk: "Performance Degradation",
          level: "Low",
          description: "Model quality issues affecting business outcomes",
          mitigation: "Continuous monitoring and A/B testing",
          status: "implemented"
        }
      ]
    },
    {
      category: "Strategic",
      level: "Medium",
      score: 5,
      color: "bg-orange-500",
      risks: [
        {
          risk: "Vendor Lock-in",
          level: "High",
          description: "Over-dependence on specific AI providers",
          mitigation: "Multi-vendor approach and standardized APIs",
          status: "action-needed"
        },
        {
          risk: "Skill Gap",
          level: "Medium",
          description: "Lack of internal AI expertise",
          mitigation: "Training programs and strategic hiring",
          status: "planned"
        },
        {
          risk: "Competitive Disadvantage",
          level: "Low",
          description: "Falling behind competitors in AI adoption",
          mitigation: "Accelerated implementation timeline",
          status: "monitoring"
        }
      ]
    }
  ];

  const complianceItems = [
    { framework: "GDPR", status: "compliant", details: "Data processing agreements in place" },
    { framework: "SOX", status: "partial", details: "Additional controls needed for financial data" },
    { framework: "HIPAA", status: "not-applicable", details: "No healthcare data processing" },
    { framework: "ISO 27001", status: "planned", details: "Security framework implementation in progress" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented":
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "planned":
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "action-needed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "implemented":
      case "compliant":
        return "bg-green-100 text-green-800";
      case "planned":
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      case "action-needed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {riskCategories.map((category, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{category.category}</span>
                <Badge variant={category.level === 'Low' ? 'default' : category.level === 'Medium' ? 'secondary' : 'destructive'}>
                  {category.level}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.score * 10}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{category.score}/10</span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {riskCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {category.category} Risks
            </CardTitle>
            <CardDescription>
              Detailed risk analysis and mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.risks.map((risk, riskIndex) => (
                <div key={riskIndex} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      {getStatusIcon(risk.status)}
                      {risk.risk}
                    </h4>
                    <div className="flex gap-2">
                      <Badge variant={risk.level === 'Low' ? 'default' : risk.level === 'Medium' ? 'secondary' : 'destructive'}>
                        {risk.level}
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                    <p className="text-sm"><strong>Mitigation:</strong> {risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Compliance Framework Status</CardTitle>
          <CardDescription>
            Current compliance status across relevant frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    {item.framework}
                  </h4>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Priority Actions:</strong> Address GDPR compliance gaps and implement vendor diversification strategy to reduce critical risks.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RiskAssessment;
