import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Atom, Shield, Scale, BarChart3, Users, ChevronRight } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { fetchCompany, fetchServices } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';

export default function Home() {
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [companyData, servicesData] = await Promise.all([
          fetchCompany(),
          fetchServices()
        ]);
        setCompany(companyData);
        setServices(servicesData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <PageLoader />;

  const iconMap = {
    ChartBar: BarChart3,
    Scale: Scale,
    Shield: Shield,
    Users: Users,
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
                <Atom size={16} />
                Enterprise Quantum Solutions
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="heading-1 text-dark-900 dark:text-white mb-6">
                Evidence-Based, <br />
                <span className="gradient-text">Vendor-Neutral</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl text-dark-500 dark:text-dark-400 mb-8 max-w-2xl mx-auto">
                {company?.description}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Start a Pilot Discussion
                  <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="btn-secondary">
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-50 dark:bg-dark-900/50">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {company?.stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-500 dark:text-dark-400">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="heading-2 text-dark-900 dark:text-white mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
                We help you navigate quantum's realities — not the hype.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company?.values.map((value, index) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <FadeIn key={value.title} delay={index * 0.1}>
                  <motion.div 
                    className="glass-card p-6 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      {value.description}
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-dark-50 dark:bg-dark-900/50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="heading-2 text-dark-900 dark:text-white mb-4">
                What We Do
              </h2>
              <p className="text-lg text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
                Professional quantum services focused on real business outcomes.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <FadeIn key={service.id} delay={index * 0.1}>
                <motion.div 
                  className="glass-card p-6 group"
                  whileHover={{ y: -5 }}
                >
                  <div 
                    className="w-1 h-12 rounded-full mb-4"
                    style={{ backgroundColor: service.color }}
                  />
                  <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-dark-500 dark:text-dark-400 mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="text-sm text-dark-400">
                    Timeline: {service.timeline}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="text-center mt-8">
              <Link to="/services" className="btn-ghost">
                View All Services
                <ChevronRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <FadeIn>
            <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border-primary-200 dark:border-primary-800">
              <h2 className="heading-2 text-dark-900 dark:text-white mb-4">
                Ready to Explore Quantum?
              </h2>
              <p className="text-lg text-dark-500 dark:text-dark-400 max-w-2xl mx-auto mb-8">
                Start with a conversation. No sales pitch — just an honest assessment of whether quantum is right for your business.
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
