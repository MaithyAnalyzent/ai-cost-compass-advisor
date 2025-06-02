
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Paperclip, FileText, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  attachments?: File[];
}

interface ConversationalBotProps {
  onComplete: (data: any) => void;
  initialData: any;
}

const ConversationalBot = ({ onComplete, initialData }: ConversationalBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const questions = [
    "What specific AI challenges is your organization currently facing?",
    "Which departments would benefit most from AI optimization?",
    "What's your biggest concern about AI implementation costs?",
    "How do you currently measure the success of your AI initiatives?",
    "What would be your ideal outcome from AI cost optimization?",
    "Are there any compliance or security requirements we should consider?",
    "What's your timeline for implementing AI cost optimization strategies?",
    "Who are the key stakeholders involved in AI decision-making at your company?"
  ];

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      text: "Hello! I'm your Business Needs Collector agent. I'll help you analyze your AI optimization needs through a few targeted questions. You can also upload relevant documents to help me understand your context better.",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setTimeout(() => {
      const firstQuestion: Message = {
        id: '2',
        text: questions[0],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([initialMessage, firstQuestion]);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if (!currentInput.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput || "Uploaded documents",
      sender: 'user',
      timestamp: new Date(),
      attachments: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    
    const newResponses = {
      ...responses,
      [questions[currentQuestionIndex]]: {
        text: currentInput,
        files: uploadedFiles.map(f => f.name)
      }
    };
    setResponses(newResponses);

    setCurrentInput('');
    setUploadedFiles([]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: questions[nextQuestionIndex],
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        const completionMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect! I have all the information I need. I'm now processing your responses and uploaded documents to generate your personalized AI cost optimization report with detailed infographics and recommendations.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, completionMessage]);
        
        setTimeout(() => {
          const finalData = {
            ...initialData,
            conversationalResponses: newResponses
          };
          onComplete(finalData);
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Business Needs Collector Agent</h1>
            <p className="text-sm text-gray-500">AI Cost Optimization Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-white border text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs bg-blue-700 bg-opacity-20 rounded px-2 py-1">
                          <FileText className="h-3 w-3" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 px-3">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {currentQuestionIndex < questions.length && (
          <div className="bg-white border-t px-4 py-4">
            {/* File Uploads */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">{file.name}</span>
                    <button onClick={() => removeFile(index)} className="text-gray-500 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2 items-end">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your response..."
                  className="pr-12 resize-none rounded-xl border-gray-300"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() && uploadedFiles.length === 0}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationalBot;
