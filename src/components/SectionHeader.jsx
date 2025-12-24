import { Sparkles } from 'lucide-react';
import { FadeIn } from './PageTransition';

export default function SectionHeader({ badge, title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <FadeIn>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 ${centered ? '' : ''}`}>
            <Sparkles size={14} />
            {badge}
          </div>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h1 className="heading-2 text-dark-900 dark:text-white mb-4">
          {title}
        </h1>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.2}>
          <p className={`text-lg text-dark-500 dark:text-dark-400 ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
