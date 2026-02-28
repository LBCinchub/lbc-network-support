import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, Sparkles, Tag, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

const priorityConfig = {
  low:    { color: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400' },
  medium: { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  high:   { color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  urgent: { color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
};

async function analyzeTicketWithAI({ subject, message, category }) {
  const result = await base44.integrations.Core.InvokeLLM({
    prompt: `You are an AI support ticket analyzer for LBC Network, a financial platform based in Ottawa, Canada.

Analyze the following support ticket and return a JSON response.

Category: ${category}
Subject: ${subject}
Message: ${message}

Assign:
1. priority: one of "low", "medium", "high", or "urgent"
   - urgent: account locked, funds missing, fraud/security breach, complete service outage
   - high: transaction failed, cannot access account, large sum involved
   - medium: pending transaction, minor account issues, billing questions
   - low: general questions, feature requests, minor UI issues

2. tags: array of 2–5 short relevant tags (e.g. "password-reset", "failed-transfer", "2fa", "kyc-verification", "refund", "fraud-alert")

3. summary: one concise sentence summarizing the issue

4. routing_note: which team should handle this (e.g. "Route to Security Team", "Route to Billing Team", "Route to Level-1 Support")

Return ONLY valid JSON with keys: priority, tags, summary, routing_note`,
    response_json_schema: {
      type: "object",
      properties: {
        priority: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        summary: { type: "string" },
        routing_note: { type: "string" }
      }
    }
  });
  return result;
}

export default function TicketForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', category: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsAnalyzing(true);

    // Run AI analysis
    let analysis = null;
    analysis = await analyzeTicketWithAI(formData);
    setAiAnalysis(analysis);
    setIsAnalyzing(false);

    // Save ticket with AI fields
    await base44.entities.SupportTicket.create({
      ...formData,
      priority: analysis?.priority || 'medium',
      ai_priority: analysis?.priority || 'medium',
      ai_tags: analysis?.tags || [],
      ai_summary: analysis?.summary || '',
      ai_routing_note: analysis?.routing_note || ''
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted && aiAnalysis) {
    const pCfg = priorityConfig[aiAnalysis.priority] || priorityConfig.medium;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Ticket Submitted!</h3>
          <p className="text-gray-500 text-sm">Our AI has analyzed your request and routed it appropriately.</p>
        </div>

        {/* AI Analysis Result */}
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-5 mb-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">AI Analysis</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500 font-medium">Priority:</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${pCfg.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pCfg.dot}`} />
              {aiAnalysis.priority.charAt(0).toUpperCase() + aiAnalysis.priority.slice(1)}
            </span>
          </div>

          {aiAnalysis.summary && (
            <div className="flex items-start gap-2 mb-3">
              <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{aiAnalysis.summary}</p>
            </div>
          )}

          {aiAnalysis.routing_note && (
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700 font-medium">{aiAnalysis.routing_note}</p>
            </div>
          )}

          {aiAnalysis.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {aiAnalysis.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs bg-white border border-gray-200 text-gray-600">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mb-4">We'll respond to your email within 24 hours.</p>
        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => {
            setIsSubmitted(false);
            setAiAnalysis(null);
            setFormData({ name: '', email: '', category: '', subject: '', message: '' });
          }}
        >
          Submit Another Ticket
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Submit a Support Ticket</h3>
        <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          AI-powered triage
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</Label>
          <Input id="name" placeholder="John Doe" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required className="h-11 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required className="h-11 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wallet">Wallet Issues</SelectItem>
              <SelectItem value="account">Account Support</SelectItem>
              <SelectItem value="transaction">Transaction Problems</SelectItem>
              <SelectItem value="security">Security & Privacy</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
          <Input id="subject" placeholder="Brief description of your issue" value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required className="h-11 rounded-xl" />
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
        <Textarea id="message" placeholder="Please describe your issue in detail..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required className="min-h-[120px] rounded-xl resize-none" />
      </div>

      <Button type="submit" disabled={isSubmitting}
        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
        {isAnalyzing ? (
          <><Sparkles className="w-4 h-4 mr-2 animate-pulse" />AI is analyzing your ticket...</>
        ) : isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" />Submit Ticket</>
        )}
      </Button>

      <p className="text-center text-xs text-gray-400 mt-3">
        <Sparkles className="w-3 h-3 inline mr-1" />
        AI will automatically assign priority and tags upon submission
      </p>
    </form>
  );
}