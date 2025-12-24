import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Atom, Shield, Scale, Users, Target } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchCompany } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

export default function About() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCompany();
        setCompany(data);
      } catch (err) {
        console.error('Failed to load company data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <PageLoader />;

  const iconMap = {
    ChartBar: Target,
    Scale: Scale,
    Shield: Shield,
    Users: Users,
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="section-container">
          <SectionHeader
            badge="About Us"
            title="Mission & Mindset"
            subtitle="We're building a quantum computing practice grounded in honesty, evidence, and practical business outcomes."
          />

          {/* Mission */}
          <FadeIn>
            <div className="glass-card p-8 mb-12 text-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border-primary-200 dark:border-primary-800">
              <Atom size={48} className="mx-auto mb-4 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
                {company?.mission}
              </p>
            </div>
          </FadeIn>

          {/* Philosophy & Commitment */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <FadeIn delay={0.1}>
              <div className="glass-card p-6 h-full">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                  Philosophy
                </h3>
                <p className="text-dark-500 dark:text-dark-400">
                  {company?.philosophy}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass-card p-6 h-full">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                  Commitment
                </h3>
                <p className="text-dark-500 dark:text-dark-400">
                  {company?.commitment}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Values */}
          <FadeIn delay={0.3}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {company?.values.map((value, index) => {
                  const Icon = iconMap[value.icon] || Shield;
                  return (
                    <motion.div
                      key={value.title}
                      className="glass-card p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center mx-auto mb-4">
                        <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-semibold text-dark-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-dark-400">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Tagline */}
          <FadeIn delay={0.5}>
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-dark-900 dark:text-white">
                "{company?.tagline}"
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
