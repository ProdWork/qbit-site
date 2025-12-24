import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Cpu, ExternalLink } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchTechnology } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

export default function Technology() {
  const [tech, setTech] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTechnology();
        setTech(data);
      } catch (err) {
        console.error('Failed to load technology:', err);
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
            badge="Technology"
            title="The Right Stack for Quantum Adoption"
            subtitle="We use industry-standard, open-source tools and major cloud platforms to ensure your quantum investments are portable and future-proof."
          />

          {/* SDKs */}
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                  <Code size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Quantum SDKs
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {tech?.sdks.map((sdk, index) => (
                  <motion.a
                    key={sdk.name}
                    href={sdk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {sdk.name}
                      </h3>
                      <ExternalLink size={16} className="text-dark-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      {sdk.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Cloud Platforms */}
          <FadeIn delay={0.2}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center">
                  <Cloud size={20} className="text-accent-600 dark:text-accent-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Cloud Platforms
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {tech?.platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    className="glass-card p-6"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      {platform.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Classical Stack */}
          <FadeIn delay={0.3}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center">
                  <Cpu size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Classical Stack
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {tech?.classical.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="glass-card p-6"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Why Hybrid */}
          <FadeIn delay={0.4}>
            <div className="glass-card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border-primary-200 dark:border-primary-800">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                Why Hybrid Matters
              </h2>
              <p className="text-dark-600 dark:text-dark-300 text-lg">
                {tech?.whyHybrid}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
