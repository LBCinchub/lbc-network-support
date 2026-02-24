import React from 'react';
import { Wallet, User, ArrowRightLeft, Shield, CreditCard, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'wallet',
    title: 'Wallet Issues',
    description: 'Balance problems, transfers, and wallet recovery',
    icon: Wallet,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    articles: 24
  },
  {
    id: 'account',
    title: 'Account Support',
    description: 'Login, verification, and profile settings',
    icon: User,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    articles: 18
  },
  {
    id: 'transaction',
    title: 'Transaction Problems',
    description: 'Pending, failed, or disputed transactions',
    icon: ArrowRightLeft,
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
    articles: 31
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: '2FA, suspicious activity, and data protection',
    icon: Shield,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    articles: 15
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    description: 'Fees, refunds, and payment methods',
    icon: CreditCard,
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    articles: 22
  },
  {
    id: 'settings',
    title: 'App & Settings',
    description: 'Notifications, preferences, and app issues',
    icon: Settings,
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    articles: 12
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HelpCategories({ onSelectCategory }) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-500">Find answers organized by topic</p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={item}
              onClick={() => onSelectCategory(category.id)}
              className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 text-left"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${category.lightColor} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{category.description}</p>
              <span className="text-xs font-medium text-gray-400">{category.articles} articles</span>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}