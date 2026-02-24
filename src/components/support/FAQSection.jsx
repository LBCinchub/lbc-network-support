import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How do I recover my wallet if I lost access?",
    answer: "If you've lost access to your wallet, you can recover it using your 12-word recovery phrase. Go to Settings > Wallet > Recover Wallet and enter your recovery phrase. If you don't have your recovery phrase, please contact our support team immediately.",
    category: "wallet"
  },
  {
    question: "Why is my transaction still pending?",
    answer: "Transactions can remain pending due to network congestion, low fees, or temporary system maintenance. Most transactions complete within 10-30 minutes. If your transaction has been pending for more than an hour, please submit a support ticket with your transaction ID.",
    category: "transaction"
  },
  {
    question: "How do I enable two-factor authentication (2FA)?",
    answer: "To enable 2FA, go to Settings > Security > Two-Factor Authentication. You can choose between SMS, email, or authenticator app verification. We recommend using an authenticator app for the highest level of security.",
    category: "security"
  },
  {
    question: "How can I update my email address?",
    answer: "You can update your email address in Settings > Account > Personal Information. You'll need to verify your current email and the new email address before the change takes effect. For security reasons, some features may be temporarily limited after changing your email.",
    category: "account"
  },
  {
    question: "What fees does LBC Network charge?",
    answer: "LBC Network charges minimal transaction fees that vary based on network conditions. You can view the current fee structure in Settings > Fees & Pricing. Premium members enjoy reduced fees on all transactions.",
    category: "payments"
  },
  {
    question: "How do I report a suspicious transaction?",
    answer: "If you notice any suspicious activity, immediately go to Security > Report Issue or contact our 24/7 support team. We take security seriously and will investigate all reports within 24 hours. You can also freeze your account temporarily from the security settings.",
    category: "security"
  }
];

export default function FAQSection({ searchQuery, selectedCategory }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-xl">
            <MessageCircleQuestion className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500">No FAQs found matching your search. Try different keywords or browse our categories.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}