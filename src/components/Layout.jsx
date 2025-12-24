import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 grid-background pointer-events-none" />
      <Navbar />
      <motion.main 
        className="flex-1 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
