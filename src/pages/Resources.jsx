import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, HelpCircle, ChevronDown } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchResources } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

export default function Resources() {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openGlossary, setOpenGlossary] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchResources();
        setResources(data);
      } catch (err) {
        console.error('Failed to load resources:', err);
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
            badge="Resources"
            title="Executive Resources & Learning"
            subtitle="Clear, jargon-free resources to help you make informed decisions about quantum computing."
          />

          {/* Executive Explainers */}
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                  <BookOpen size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Executive Explainers
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {resources?.explainers.map((item, index) => {
                  // Add PDF link for Quantum 101 for Executives
                  const isQuantum101 = item.title === "Quantum 101 for Executives";
                  return (
                    <motion.div
                      key={item.title}
                      className="glass-card p-6 group cursor-pointer"
                      whileHover={{ y: -5 }}
                    >
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 mb-3">
                        {item.type}
                      </span>
                      <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-dark-400 mb-3">
                        {item.description}
                      </p>
                      <span className="text-xs text-dark-400 block mb-2">
                        {item.readTime} read
                      </span>
                      {isQuantum101 && (
                        <a
                          href="/resources/%F0%9F%93%98%20Quantum%20101%20for%20Executives.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1 px-4 py-2 text-sm font-medium rounded bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow"
                        >
                          Download PDF
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Reports */}
          <FadeIn delay={0.2}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center">
                  <FileText size={20} className="text-accent-600 dark:text-accent-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Reports
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {resources?.reports.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="glass-card p-6 group cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent-50 dark:bg-accent-950/50 text-accent-600 dark:text-accent-400 mb-3">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-3">
                      {item.description}
                    </p>
                    <span className="text-xs text-dark-400">
                      {item.pages} pages
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Glossary */}
          <FadeIn delay={0.3}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center">
                  <HelpCircle size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Glossary
                </h2>
              </div>
              <div className="glass-card overflow-hidden">
                {resources?.glossary.map((item, index) => (
                  <div 
                    key={item.term}
                    className="border-b border-dark-200 dark:border-dark-700 last:border-0"
                  >
                    <button
                      onClick={() => setOpenGlossary(openGlossary === index ? null : index)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors"
                    >
                      <span className="font-semibold text-dark-900 dark:text-white">
                        {item.term}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-dark-400 transition-transform ${openGlossary === index ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openGlossary === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="px-5 pb-5"
                      >
                        <p className="text-dark-500 dark:text-dark-400">
                          {item.definition}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
