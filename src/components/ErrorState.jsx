import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[40vh] flex items-center justify-center"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
          {message}
        </h3>
        <p className="text-dark-500 dark:text-dark-400 mb-6">
          Please try again or contact support if the problem persists.
        </p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}
