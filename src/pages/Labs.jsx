import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Calculator, FlaskConical, ArrowRight } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchTools } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

const iconMap = {
  ClipboardCheck: ClipboardCheck,
  Calculator: Calculator,
  FlaskConical: FlaskConical,
};

export default function Labs() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTools();
        setTools(data);
      } catch (err) {
        console.error('Failed to load tools:', err);
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
            badge="Labs & Tools"
            title="Educational Quantum Utilities"
            subtitle="Grounded, realistic tools to help you understand quantum computing's relevance to your business."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = iconMap[tool.icon] || FlaskConical;
              const isComingSoon = tool.status === 'coming-soon';
              
              return (
                <FadeIn key={tool.id} delay={index * 0.1}>
                  <motion.div 
                    className={`glass-card p-6 h-full flex flex-col ${isComingSoon ? 'opacity-75' : ''}`}
                    whileHover={!isComingSoon ? { y: -5 } : {}}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                        <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      {isComingSoon && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                          Coming Soon
                        </span>
                      )}
                      {tool.status === 'available' && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400">
                          Available
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {tool.title}
                    </h3>
                    
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-6 flex-grow">
                      {tool.description}
                    </p>

                    <button 
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                        isComingSoon 
                          ? 'bg-dark-100 dark:bg-dark-800 text-dark-400 cursor-not-allowed' 
                          : 'btn-primary'
                      }`}
                      disabled={isComingSoon}
                    >
                      {isComingSoon ? 'Coming Soon' : 'Try Now'}
                      {!isComingSoon && <ArrowRight size={16} />}
                    </button>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {/* Disclaimer */}
          <FadeIn delay={0.4}>
            <div className="mt-12 p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> These tools are educational and designed to build understanding. They are not production-grade quantum computing solutions. Use them to explore concepts and inform your quantum strategy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
