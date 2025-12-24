import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-4 bg-dark-200 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-5/6"></div>
    </div>
  );
}
