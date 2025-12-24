import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Building, Truck, ArrowRight, Database, Target, FlaskConical } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchIndustries } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

const iconMap = {
  Heart: Heart,
  Building: Building,
  Truck: Truck,
};

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchIndustries();
        setIndustries(data);
      } catch (err) {
        console.error('Failed to load industries:', err);
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
            badge="Industries"
            title="Quantum Solutions for Key Sectors"
            subtitle="We focus on industries where optimization, simulation, and advanced analytics create measurable business value."
          />

          <div className="space-y-8">
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.icon] || Building;
              return (
                <FadeIn key={industry.id} delay={index * 0.1}>
                  <motion.div 
                    className="glass-card overflow-hidden"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-8">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${industry.color}15` }}
                        >
                          <Icon size={32} style={{ color: industry.color }} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                            {industry.name}
                          </h2>
                          <p className="text-dark-500 dark:text-dark-400">
                            {industry.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Decision Problems */}
                        <div className="p-5 rounded-xl bg-dark-50 dark:bg-dark-800/50">
                          <div className="flex items-center gap-2 mb-4">
                            <Target size={18} className="text-primary-500" />
                            <h3 className="font-semibold text-dark-900 dark:text-white">
                              Decision Problems
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {industry.decisionProblems.map((problem, i) => (
                              <li key={i} className="text-sm text-dark-600 dark:text-dark-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                                {problem}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Near-Term Pilots */}
                        <div className="p-5 rounded-xl bg-dark-50 dark:bg-dark-800/50">
                          <div className="flex items-center gap-2 mb-4">
                            <FlaskConical size={18} className="text-accent-500" />
                            <h3 className="font-semibold text-dark-900 dark:text-white">
                              Near-Term Pilots
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {industry.nearTermPilots.map((pilot, i) => (
                              <li key={i} className="text-sm text-dark-600 dark:text-dark-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 flex-shrink-0" />
                                {pilot}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Data Required */}
                        <div className="p-5 rounded-xl bg-dark-50 dark:bg-dark-800/50">
                          <div className="flex items-center gap-2 mb-4">
                            <Database size={18} className="text-purple-500" />
                            <h3 className="font-semibold text-dark-900 dark:text-white">
                              Data Required
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {industry.dataRequired.map((data, i) => (
                              <li key={i} className="text-sm text-dark-600 dark:text-dark-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                                {data}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {/* CTA */}
          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-dark-500 dark:text-dark-400 mb-4">
                Don't see your industry? We work across sectors where optimization matters.
              </p>
              <Link to="/contact" className="btn-primary">
                Discuss Your Use Case
                <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
