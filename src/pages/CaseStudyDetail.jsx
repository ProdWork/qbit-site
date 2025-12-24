import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { fetchCaseStudy } from '../services/api';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCaseStudy(id);
        setStudy(data);
      } catch (err) {
        setError('Case study not found');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} />;

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="section-container max-w-4xl">
          {/* Back Link */}
          <FadeIn>
            <Link 
              to="/case-studies" 
              className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Case Studies
            </Link>
          </FadeIn>

          {/* Header */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
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
              <h1 className="heading-2 text-dark-900 dark:text-white">
                {study.title}
              </h1>
            </div>
          </FadeIn>

          {/* Problem */}
          <FadeIn delay={0.2}>
            <div className="glass-card p-6 mb-8">
              <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                The Problem
              </h2>
              <p className="text-dark-600 dark:text-dark-300">
                {study.problem}
              </p>
            </div>
          </FadeIn>

          {/* What Was Tested */}
          <FadeIn delay={0.3}>
            <div className="glass-card p-6 mb-8">
              <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                What Was Tested
              </h2>
              <p className="text-dark-600 dark:text-dark-300">
                {study.whatWasTested}
              </p>
            </div>
          </FadeIn>

          {/* Results */}
          <FadeIn delay={0.4}>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What Worked */}
              <div className="glass-card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={20} className="text-green-500" />
                  <h2 className="text-lg font-semibold text-dark-900 dark:text-white">
                    What Worked
                  </h2>
                </div>
                <ul className="space-y-3">
                  {study.results.worked.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Didn't Work */}
              <div className="glass-card p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle size={20} className="text-red-500" />
                  <h2 className="text-lg font-semibold text-dark-900 dark:text-white">
                    What Didn't Work
                  </h2>
                </div>
                <ul className="space-y-3">
                  {study.results.didNotWork.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Business Insight */}
          <FadeIn delay={0.5}>
            <div className="glass-card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border-primary-200 dark:border-primary-800 mb-12">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                    Business Insight
                  </h2>
                  <p className="text-dark-600 dark:text-dark-300">
                    {study.businessInsight}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.6}>
            <div className="text-center">
              <p className="text-dark-500 dark:text-dark-400 mb-4">
                Interested in running a similar pilot?
              </p>
              <Link to="/contact" className="btn-primary">
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
