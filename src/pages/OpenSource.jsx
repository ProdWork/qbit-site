import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Heart, ExternalLink, Code } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchOpenSource } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

export default function OpenSource() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchOpenSource();
        setData(result);
      } catch (err) {
        console.error('Failed to load open source data:', err);
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
            badge="Open Source"
            title="Open Source for Quantum Progress"
            subtitle="We believe open tools and standards are essential for responsible quantum development."
          />

          {/* Contributions */}
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                  <Code size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Our Contributions
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data?.contributions.map((contribution, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-5 flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <p className="text-dark-600 dark:text-dark-300">{contribution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Supported Projects */}
          <FadeIn delay={0.2}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center">
                  <Github size={20} className="text-accent-600 dark:text-accent-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Supported Projects
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {data?.projects.map((project, index) => (
                  <motion.a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.name}
                      </h3>
                      <ExternalLink size={16} className="text-dark-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      {project.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Why Open Source */}
          <FadeIn delay={0.3}>
            <div className="glass-card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border-primary-200 dark:border-primary-800">
              <div className="flex items-center gap-3 mb-4">
                <Heart size={24} className="text-red-500" />
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  Why It Matters
                </h2>
              </div>
              <p className="text-dark-600 dark:text-dark-300 text-lg">
                {data?.whyOpenSource}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
