
// Lyzr Studio API Integration Service
// Note: API keys should be stored in Supabase secrets for production

interface LyzrAgentConfig {
  agentId: string;
  apiKey: string;
  baseUrl: string;
}

interface BusinessAnalysisRequest {
  companyData: any;
  conversationalResponses: any;
}

export class LyzrService {
  private config: LyzrAgentConfig;

  constructor(config: LyzrAgentConfig) {
    this.config = config;
  }

  async triggerBusinessNeedsCollector(data: BusinessAnalysisRequest) {
    try {
      const response = await fetch(`${this.config.baseUrl}/agents/${this.config.agentId}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          input: data,
          session_id: `session_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lyzr API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling Lyzr Studio API:', error);
      throw error;
    }
  }

  async getAnalysisResults(sessionId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/sessions/${sessionId}/results`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Lyzr API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching analysis results:', error);
      throw error;
    }
  }
}

// Factory function to create service with environment variables
export const createLyzrService = () => {
  // These should come from Supabase secrets in production
  const config = {
    agentId: process.env.REACT_APP_LYZR_AGENT_ID || 'your-agent-id',
    apiKey: process.env.REACT_APP_LYZR_API_KEY || 'your-api-key',
    baseUrl: process.env.REACT_APP_LYZR_BASE_URL || 'https://api.lyzr.ai/v1',
  };

  return new LyzrService(config);
};
