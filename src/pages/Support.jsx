import React, { useState } from 'react';
import { TicketCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSearch from '@/components/support/HeroSearch';
import HelpCategories from '@/components/support/HelpCategories';
import FAQSection from '@/components/support/FAQSection';
import TicketForm from '@/components/support/TicketForm';
import LiveChatButton from '@/components/support/LiveChatButton';
import ContactCards from '@/components/support/ContactCards';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    // Scroll to FAQ section
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">LBC</span>
            </div>
            <span className="font-semibold text-gray-900">Support Center</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#categories" className="hover:text-gray-900 transition-colors">Categories</a>
            <a href="#faq-section" className="hover:text-gray-900 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Search */}
      <HeroSearch onSearch={handleSearch} />

      {/* Help Categories */}
      <div id="categories">
        <HelpCategories onSelectCategory={handleSelectCategory} />
      </div>

      {/* FAQ Section */}
      <div id="faq-section">
        <FAQSection searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </div>

      {/* Contact & Ticket Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-4">
              <TicketCheck className="w-4 h-4" />
              Need more help?
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Get in Touch</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Can't find what you're looking for? Our support team is here to help you resolve any issues.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TicketForm />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why submit a ticket?</h3>
                <ul className="space-y-4">
                  {[
                    'Get personalized assistance from our expert team',
                    'Track the status of your request in real-time',
                    'Receive detailed solutions via email',
                    'Priority support for urgent issues'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <ContactCards />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2026 LBC Network. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Status Page</a>
          </div>
        </div>
      </footer>

      {/* Live Chat Button */}
      <LiveChatButton />
    </div>
  );
}