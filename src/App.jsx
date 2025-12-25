import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Solutions from './pages/Solutions';
import HowWeWork from './pages/HowWeWork';
import Technology from './pages/Technology';
import OpenSource from './pages/OpenSource';
import Resources from './pages/Resources';
import Labs from './pages/Labs';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import About from './pages/About';
import Contact from './pages/Contact';

const routerBase = (() => {
  const base = import.meta.env.VITE_ROUTER_BASE ?? '/';
  if (base === '/') return '/';
  return base.replace(/\/$/, '');
})();

function App() {
  return (
    <ThemeProvider>
      <Router basename={routerBase}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="industries" element={<Industries />} />
              <Route path="solutions" element={<Solutions />} />
              <Route path="how-we-work" element={<HowWeWork />} />
              <Route path="technology" element={<Technology />} />
              <Route path="open-source" element={<OpenSource />} />
              <Route path="resources" element={<Resources />} />
              <Route path="labs" element={<Labs />} />
              <Route path="case-studies" element={<CaseStudies />} />
              <Route path="case-studies/:id" element={<CaseStudyDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
