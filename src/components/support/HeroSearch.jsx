import React, { useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function HeroSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16 md:py-24 px-4 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3" />
      
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg shadow-blue-100 mb-6"
        >
          <HelpCircle className="w-8 h-8 text-blue-500" />
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          How can we help you?
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Search our knowledge base or browse categories below to find the answers you need.
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 h-14 text-base rounded-2xl border-gray-200 bg-white shadow-lg shadow-gray-100/50 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span>Popular:</span>
            <button type="button" onClick={() => onSearch('reset password')} className="text-blue-600 hover:text-blue-700 hover:underline">Reset password</button>
            <span>•</span>
            <button type="button" onClick={() => onSearch('wallet recovery')} className="text-blue-600 hover:text-blue-700 hover:underline">Wallet recovery</button>
            <span>•</span>
            <button type="button" onClick={() => onSearch('pending transaction')} className="text-blue-600 hover:text-blue-700 hover:underline">Pending transaction</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}