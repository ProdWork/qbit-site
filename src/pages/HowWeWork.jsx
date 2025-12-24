import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Database, BarChart3, Cpu, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchProcess } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

const iconMap = {
  Target: Target,
  Database: Database,
  BarChart: BarChart3,
  Cpu: Cpu,
  CheckCircle: CheckCircle,
};

export default function HowWeWork() {
  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProcess();
        setProcess(data);
      } catch (err) {
        console.error('Failed to load process:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="section-container">
          <SectionHeader
            badge="Our Process"
            title="Evidence-Based Quantum Engagement"
            subtitle="We follow a structured, transparent process that ensures you understand exactly what you're getting — and what you're not."
          />

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 -translate-x-1/2" />
            
            <div className="space-y-8 lg:space-y-0">
              {process?.process.map((step, index) => {
                const Icon = iconMap[step.icon] || Target;
                const isEven = index % 2 === 0;
                
                return (
                  <FadeIn key={step.step} delay={index * 0.1}>
                    <div className={`lg:flex items-center gap-8 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                      {/* Content */}
                      <motion.div 
                        className={`flex-1 ${isEven ? 'lg:text-right' : ''}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`glass-card p-6 ${isEven ? 'lg:mr-12' : 'lg:ml-12'}`}>
                          <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                              <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                                Step {step.step}
                              </span>
                              <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-dark-500 dark:text-dark-400 mb-4">
                            {step.description}
                          </p>
                          <div className={`flex items-center gap-2 text-sm text-dark-400 ${isEven ? 'lg:justify-end' : ''}`}>
                            <Clock size={14} />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Step Number (Desktop) */}
                      <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg shadow-primary-500/25 z-10">
                        {step.step}
                      </div>

                      {/* Empty Space */}
                      <div className="flex-1 hidden lg:block" />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Key Principles */}
          <FadeIn delay={0.6}>
            <div className="mt-20 glass-card p-8">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6 text-center">
                Key Principles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950/50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                  <h3 className="font-semibold text-dark-900 dark:text-white mb-2">Classical First</h3>
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    We always establish classical baselines before testing quantum approaches.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mx-auto mb-4">
                    <Target size={24} className="text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-dark-900 dark:text-white mb-2">Business Outcomes</h3>
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    Success is measured by business impact, not quantum metrics.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={24} className="text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-dark-900 dark:text-white mb-2">Honest Reporting</h3>
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    We tell you what worked and what didn't — no cherry-picking results.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.7}>
            <div className="mt-12 text-center">
              <Link to="/contact" className="btn-primary">
                Start the Process
                <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
