
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Clock, Shield, Users, Brain } from "lucide-react";

interface InfographicsProps {
  businessData: any;
}

const Infographics = ({ businessData }: InfographicsProps) => {
  const costSavingsData = [
    { month: 'Month 1', current: 25000, optimized: 15000, savings: 10000 },
    { month: 'Month 2', current: 25000, optimized: 14000, savings: 11000 },
    { month: 'Month 3', current: 25000, optimized: 13000, savings: 12000 },
    { month: 'Month 6', current: 25000, optimized: 12000, savings: 13000 },
    { month: 'Month 12', current: 25000, optimized: 10000, savings: 15000 },
  ];

  const modelUsageData = [
    { name: 'GPT-4', usage: 35, color: '#3B82F6' },
    { name: 'Claude 3.5', usage: 25, color: '#10B981' },
    { name: 'Groq', usage: 20, color: '#F59E0B' },
    { name: 'Mistral', usage: 15, color: '#EF4444' },
    { name: 'Others', usage: 5, color: '#8B5CF6' },
  ];

  const roiTimelineData = [
    { quarter: 'Q1', investment: 50000, returns: 20000, roi: -30000 },
    { quarter: 'Q2', investment: 30000, returns: 45000, roi: 15000 },
    { quarter: 'Q3', investment: 20000, returns: 65000, roi: 45000 },
    { quarter: 'Q4', investment: 15000, returns: 85000, roi: 70000 },
  ];

  const departmentImpactData = [
    { department: 'Customer Support', impact: 85, cost: 12000 },
    { department: 'Sales', impact: 75, cost: 8000 },
    { department: 'Marketing', impact: 65, cost: 6000 },
    { department: 'HR', impact: 55, cost: 4000 },
    { department: 'Finance', impact: 70, cost: 5000 },
    { department: 'IT', impact: 90, cost: 15000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Cost Optimization Infographics</h2>
        <p className="text-gray-600">Visual insights into your AI transformation journey</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Potential Savings</p>
                <p className="text-3xl font-bold">$540K</p>
                <p className="text-blue-100 text-sm">Annual projection</p>
              </div>
              <DollarSign className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">ROI Break-even</p>
                <p className="text-3xl font-bold">4.2</p>
                <p className="text-green-100 text-sm">Months</p>
              </div>
              <Clock className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Efficiency Gain</p>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-purple-100 text-sm">Optimization potential</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Savings Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Cost Savings Projection Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={costSavingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Area type="monotone" dataKey="current" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
              <Area type="monotone" dataKey="optimized" stackId="2" stroke="#10B981" fill="#D1FAE5" />
              <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Recommended Model Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={modelUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="usage"
                  label={({name, usage}) => `${name}: ${usage}%`}
                >
                  {modelUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              ROI Timeline Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Line type="monotone" dataKey="investment" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="returns" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="roi" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Department Impact & Cost Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentImpactData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="department" width={120} />
              <Bar dataKey="impact" fill="#3B82F6" name="Impact Score %" />
              <Bar dataKey="cost" fill="#10B981" name="Monthly Savings $" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Assessment Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Risk Assessment Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="text-2xl font-bold text-green-600">LOW</div>
              <div className="text-sm text-green-700">Technical Risk</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">MEDIUM</div>
              <div className="text-sm text-yellow-700">Implementation Risk</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="text-2xl font-bold text-green-600">LOW</div>
              <div className="text-sm text-green-700">Financial Risk</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="text-2xl font-bold text-blue-600">HIGH</div>
              <div className="text-sm text-blue-700">Opportunity Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Infographics;
