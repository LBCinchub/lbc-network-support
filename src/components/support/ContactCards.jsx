import React from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  {
    icon: Mail,
    title: 'Email Support',
    value: 'Tarek-samara@lbc-hub.com',
    subtitle: 'We reply within 24 hours',
    color: 'bg-blue-500'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    value: '613-314-1994',
    subtitle: 'Mon-Fri, 9AM–6PM ET',
    color: 'bg-emerald-500'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: '24/7 AI Chat',
    subtitle: 'Phone: Mon-Fri 9–6 ET',
    color: 'bg-violet-500'
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    value: 'Ottawa, Ontario',
    subtitle: 'Canada 🍁',
    color: 'bg-amber-500'
  }
];

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {contacts.map((contact, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg hover:shadow-gray-100/50 transition-all"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 ${contact.color} bg-opacity-10 rounded-xl mb-3`}>
            <contact.icon className={`w-5 h-5 ${contact.color.replace('bg-', 'text-')}`} />
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{contact.title}</p>
          <p className="font-semibold text-gray-900 mb-0.5">{contact.value}</p>
          <p className="text-sm text-gray-500">{contact.subtitle}</p>
        </motion.div>
      ))}
    </div>
  );
}