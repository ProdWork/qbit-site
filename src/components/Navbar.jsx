import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronDown
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'How We Work', path: '/how-we-work' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'About', path: '/about' },
];

const moreItems = [
  { name: 'Technology', path: '/technology' },
  { name: 'Open Source', path: '/open-source' },
  { name: 'Resources', path: '/resources' },
  { name: 'Labs & Tools', path: '/labs' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowMore(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 glass shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-display font-bold text-lg">Q</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl text-dark-900 dark:text-white">
                Qbit Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white rounded-lg transition-all duration-200"
              >
                More
                <ChevronDown size={16} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 py-2 glass-card shadow-xl"
                  >
                    {moreItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                          block px-4 py-2 text-sm font-medium transition-colors
                          ${isActive 
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' 
                            : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                          }
                        `}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* CTA Button */}
            <Link to="/contact" className="hidden sm:flex btn-primary text-sm">
              Start a Pilot
            </Link>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="glass-card p-4 space-y-2">
                {[...navItems, ...moreItems].map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        block px-4 py-3 rounded-xl font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400' 
                          : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                        }
                      `}
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + moreItems.length) * 0.05 }}
                  className="pt-2"
                >
                  <Link to="/contact" className="btn-primary w-full text-sm">
                    Start a Pilot
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
