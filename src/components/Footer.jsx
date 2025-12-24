import { Link } from 'react-router-dom';
import { Atom, Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Quantum Readiness', path: '/services#quantum-readiness' },
      { name: 'Optimization Pilots', path: '/services#hybrid-optimization' },
      { name: 'Quantum ML', path: '/services#quantum-ml' },
      { name: 'Software Engineering', path: '/services#quantum-software' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: 'How We Work', path: '/how-we-work' },
      { name: 'Contact', path: '/contact' },
    ],
    resources: [
      { name: 'Technology', path: '/technology' },
      { name: 'Open Source', path: '/open-source' },
      { name: 'Resources', path: '/resources' },
      { name: 'Labs & Tools', path: '/labs' },
    ],
  };

  return (
    <footer className="relative z-10 border-t border-dark-200 dark:border-dark-800 bg-white/50 dark:bg-dark-950/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">Q</span>
              </div>
              <span className="font-display font-bold text-xl text-dark-900 dark:text-white">Qbit</span>
            </Link>
            <p className="text-sm text-dark-500 dark:text-dark-400 mb-4">
              Evidence-based quantum computing services for enterprises.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com/company/qbit" className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-500 hover:text-primary-600 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/qbit" className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-500 hover:text-primary-600 transition-colors">
                <Github size={18} />
              </a>
              <a href="mailto:contact@qbit.io" className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-500 hover:text-primary-600 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-dark-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-200 dark:border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500 dark:text-dark-400 flex items-center gap-1">
            © {currentYear} Qbit. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
            <Atom size={14} className="text-primary-500" />
            <span>Quantum-inspired today, quantum-ready tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
