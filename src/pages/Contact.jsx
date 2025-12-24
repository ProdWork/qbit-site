import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Building, MessageSquare } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    problem: '',
    dataReady: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageTransition>
        <section className="pt-32 pb-20">
          <div className="section-container max-w-2xl">
            <motion.div 
              className="glass-card p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                Thank You!
              </h2>
              <p className="text-dark-500 dark:text-dark-400 mb-6">
                We've received your inquiry and will get back to you within 2 business days. No sales pitch — just an honest conversation about whether quantum is right for you.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="section-container max-w-3xl">
          <SectionHeader
            badge="Contact"
            title="Start Your Quantum Pilot"
            subtitle="Tell us about your problem. We'll give you an honest assessment of whether quantum approaches might help."
          />

          <FadeIn>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field pl-11"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-field pl-11"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Industry</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="banking">Banking & Finance</option>
                    <option value="supply-chain">Supply Chain & Logistics</option>
                    <option value="energy">Energy</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Problem Description *
                </label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-dark-400" />
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field pl-11 resize-none"
                    placeholder="Describe the business problem you're trying to solve. What have you tried? What constraints do you face?"
                  />
                </div>
              </div>

              {/* Data Ready Checkbox */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="dataReady"
                    checked={formData.dataReady}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500 mt-0.5"
                  />
                  <span className="text-sm text-dark-600 dark:text-dark-300">
                    We have relevant data available for this problem (historical records, operational data, etc.)
                  </span>
                </label>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Inquiry
                <Send size={18} />
              </motion.button>

              <p className="text-xs text-dark-400 text-center mt-4">
                By submitting, you agree to receive a response from our team. We never share your information.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
