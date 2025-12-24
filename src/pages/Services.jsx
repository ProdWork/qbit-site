import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Cpu, Brain, Code, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { fetchServices } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

const iconMap = {
  Compass: Compass,
  Cpu: Cpu,
  Brain: Brain,
  Code: Code,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
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
            badge="Our Services"
            title="Professional Quantum Services for Enterprises"
            subtitle="From readiness assessments to production pilots, we help you navigate quantum computing with clarity and confidence."
          />

          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Compass;
              return (
                <FadeIn key={service.id} delay={index * 0.1}>
                  <motion.div 
                    id={service.id}
                    className="glass-card overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="h-1 w-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <div className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Title and Description */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start gap-4 mb-6">
                            <div 
                              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${service.color}15` }}
                            >
                              <Icon size={28} style={{ color: service.color }} />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                                {service.title}
                              </h2>
                              <p className="text-dark-500 dark:text-dark-400">
                                {service.shortDescription}
                              </p>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
                              Business Problem
                            </h3>
                            <p className="text-dark-600 dark:text-dark-300">
                              {service.businessProblem}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
                              Deliverables
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {service.deliverables.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-dark-600 dark:text-dark-300">
                                  <CheckCircle size={16} className="text-accent-500 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Timeline and Outcomes */}
                        <div className="lg:border-l lg:border-dark-200 lg:dark:border-dark-700 lg:pl-8">
                          <div className="mb-6">
                            <div className="flex items-center gap-2 text-dark-400 mb-2">
                              <Clock size={16} />
                              <span className="text-sm font-medium uppercase tracking-wider">Timeline</span>
                            </div>
                            <p className="text-2xl font-bold text-dark-900 dark:text-white">
                              {service.timeline}
                            </p>
                          </div>

                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-2">
                              Expected Outcomes
                            </h3>
                            <p className="text-sm text-dark-600 dark:text-dark-300">
                              {service.outcomes}
                            </p>
                          </div>

                          <Link 
                            to="/contact" 
                            className="btn-primary w-full text-sm"
                          >
                            Discuss This Service
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
