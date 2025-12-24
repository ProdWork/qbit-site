import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Shield, Atom, BarChart3, ArrowRight } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchSolutions } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

const iconMap = {
  Calendar: Calendar,
  Shield: Shield,
  Atom: Atom,
  BarChart: BarChart3,
};

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSolutions();
        setSolutions(data);
      } catch (err) {
        console.error('Failed to load solutions:', err);
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
            badge="Solutions"
            title="Problem-Focused Quantum Solutions"
            subtitle="We organize by the problems you're trying to solve, not by algorithms or technology."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => {
              const Icon = iconMap[solution.icon] || Atom;
              return (
                <FadeIn key={solution.id} delay={index * 0.1}>
                  <motion.div 
                    className="glass-card h-full overflow-hidden group"
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="h-1.5 w-full"
                      style={{ backgroundColor: solution.color }}
                    />
                    <div className="p-8">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${solution.color}15` }}
                      >
                        <Icon size={28} style={{ color: solution.color }} />
                      </div>

                      <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                        {solution.title}
                      </h2>
                      
                      <p className="text-dark-500 dark:text-dark-400 mb-6">
                        {solution.description}
                      </p>

                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
                          Use Cases
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {solution.useCases.map((useCase, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 text-sm rounded-full bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
                        <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-2">
                          Our Approach
                        </h3>
                        <p className="text-sm text-dark-600 dark:text-dark-300">
                          {solution.approach}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {/* CTA */}
          <FadeIn delay={0.5}>
            <div className="mt-12 text-center">
              <Link to="/contact" className="btn-primary">
                Discuss Your Problem
                <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
