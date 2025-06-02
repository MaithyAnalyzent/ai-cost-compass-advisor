
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Building, Users, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ConversationalBot from "@/components/ConversationalBot";
import AuthModal from "@/components/AuthModal";
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  onComplete: (data: any) => void;
}

const ChatInterface = ({ onComplete }: ChatInterfaceProps) => {
  const [step, setStep] = useState(0);
  const [showConversationalBot, setShowConversationalBot] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: '',
    companySize: '',
    industry: '',
    departments: [],
    currentAITools: '',
    monthlyBudget: '',
    maturityLevel: '',
    challenges: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const steps = [
    {
      icon: Building,
      title: "Company Information",
      description: "Tell us about your organization"
    },
    {
      icon: Users,
      title: "AI Usage & Teams",
      description: "Current AI implementation and teams"
    },
    {
      icon: DollarSign,
      title: "Budget & Investment",
      description: "Financial context and spending"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // After step 3, check authentication
      if (!user) {
        setShowAuthModal(true);
      } else {
        setShowConversationalBot(true);
      }
    }
  };

  const handleAuthSuccess = () => {
    setShowConversationalBot(true);
  };

  const handleConversationComplete = async (data: any) => {
    try {
      // Save the report to Firebase
      if (user) {
        await addDoc(collection(db, 'reports'), {
          userId: user.uid,
          companyName: data.companyName,
          reportData: data,
          createdAt: new Date(),
        });
        
        toast({
          title: "Report Saved",
          description: "Your analysis has been saved to your account",
        });
      }
      
      onComplete(data);
    } catch (error) {
      console.error('Error saving report:', error);
      toast({
        title: "Error",
        description: "Failed to save report, but analysis will continue",
        variant: "destructive",
      });
      onComplete(data);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.companyName && formData.companySize && formData.industry;
      case 1:
        return formData.departments.length > 0 && formData.maturityLevel;
      case 2:
        return formData.monthlyBudget;
      default:
        return false;
    }
  };

  if (showConversationalBot) {
    return <ConversationalBot onComplete={handleConversationComplete} initialData={formData} />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company Size</label>
              <Select onValueChange={(value) => setFormData({...formData, companySize: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                  <SelectItem value="small">Small (11-50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                  <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <Select onValueChange={(value) => setFormData({...formData, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Departments Using AI</label>
              <div className="grid grid-cols-2 gap-2">
                {['Customer Support', 'Sales', 'Marketing', 'HR', 'Finance', 'IT', 'Operations', 'R&D'].map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={dept}
                      checked={formData.departments.includes(dept)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, departments: [...formData.departments, dept]});
                        } else {
                          setFormData({...formData, departments: formData.departments.filter(d => d !== dept)});
                        }
                      }}
                      className="rounded"
                    />
                    <label htmlFor={dept} className="text-sm">{dept}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current AI Tools</label>
              <Textarea
                value={formData.currentAITools}
                onChange={(e) => setFormData({...formData, currentAITools: e.target.value})}
                placeholder="List your current AI tools and platforms (ChatGPT, Claude, custom models, etc.)"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">AI Maturity Level</label>
              <Select onValueChange={(value) => setFormData({...formData, maturityLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select maturity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exploring">Exploring AI options</SelectItem>
                  <SelectItem value="pilot">Running pilot projects</SelectItem>
                  <SelectItem value="implementing">Actively implementing</SelectItem>
                  <SelectItem value="optimizing">Optimizing existing AI</SelectItem>
                  <SelectItem value="advanced">Advanced AI operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Monthly AI Budget</label>
              <Select onValueChange={(value) => setFormData({...formData, monthlyBudget: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select monthly budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1k">Under $1,000</SelectItem>
                  <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="over-100k">Over $100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Challenges</label>
              <Textarea
                value={formData.challenges}
                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                placeholder="Describe your current AI-related challenges (high costs, poor ROI, model selection, etc.)"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((stepInfo, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <stepInfo.icon className="h-5 w-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    index < step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Badge className="bg-blue-100 text-blue-800">
                Step {step + 1} of {steps.length}
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {steps[step].title}
            </CardTitle>
            <p className="text-gray-600">{steps[step].description}</p>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {step === steps.length - 1 ? (
                  <>Continue to Analysis <Send className="ml-2 h-4 w-4" /></>
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default ChatInterface;
