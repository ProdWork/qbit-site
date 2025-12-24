import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Building } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchCaseStudies } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

export default function CaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCaseStudies();
        setStudies(data);
      } catch (err) {
        console.error('Failed to load case studies:', err);
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
            badge="Case Studies"
            title="Honest Enterprise Quantum Pilots"
            subtitle="Real projects, real results — including what didn't work. We believe in transparency."
          />

          <div className="space-y-6">
            {studies.map((study, index) => (
              <FadeIn key={study.id} delay={index * 0.1}>
                <Link to={`/case-studies/${study.id}`}>
                  <motion.div 
                    className="glass-card overflow-hidden group"
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="h-1.5 w-full"
                      style={{ backgroundColor: study.color }}
                    />
                    <div className="p-8">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span 
                          className="px-3 py-1 text-sm font-medium rounded-full"
                          style={{ 
                            backgroundColor: `${study.color}15`,
                            color: study.color 
                          }}
                        >
                          {study.industry}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-dark-400">
                          <Clock size={14} />
                          <span>{study.timeline}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {study.title}
                      </h2>

                      <p className="text-dark-500 dark:text-dark-400 mb-6 line-clamp-2">
                        {study.problem}
                      </p>

                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm">
                        <span>Read Full Case Study</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-dark-500 dark:text-dark-400 mb-4">
                Want to become our next case study?
              </p>
              <Link to="/contact" className="btn-primary">
                Start a Pilot Discussion
                <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
