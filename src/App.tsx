import React, { Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import LeadCaptureModal, { LeadData } from '@/components/LeadCaptureModal';
import { PROPERTIES } from '@/constants';

const PropertyDetail = React.lazy(() => import('@/pages/PropertyDetail'));
const ServiceDetail = React.lazy(() => import('@/pages/ServiceDetail'));
const ArticleDetail = React.lazy(() => import('@/pages/ArticleDetail'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

export type NavigatePage = 'home' | 'detail' | 'service' | 'article';
export type NavigateFn = (page: NavigatePage, id?: string) => void;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLeadCaptured, setIsLeadCaptured] = React.useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('corner_home_lead_captured') === 'true';
  });
  const [isLeadModalOpen, setIsLeadModalOpen] = React.useState(false);
  const [pendingPropertyId, setPendingPropertyId] = React.useState<string | undefined>();

  const handleNavigate: NavigateFn = (page, id) => {
    if (page === 'home') {
      if (id && id.startsWith('#')) {
        const sectionId = id.substring(1);
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (page === 'detail' && id) {
      // LEAD GATE for Properties
      if (!isLeadCaptured) {
        setPendingPropertyId(id);
        setIsLeadModalOpen(true);
        return;
      }
      navigate(`/properties/${id}`);
      window.scrollTo(0, 0);
    } else if (page === 'service' && id) {
      navigate(`/services/${id}`);
      window.scrollTo(0, 0);
    } else if (page === 'article' && id) {
      navigate(`/journal/${id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleLeadSuccess = (data: LeadData) => {
    setIsLeadCaptured(true);
    localStorage.setItem('corner_home_lead_captured', 'true');
    setIsLeadModalOpen(false);

    if (pendingPropertyId) {
      navigate(`/properties/${pendingPropertyId}`);
      setPendingPropertyId(undefined);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar onNavigate={handleNavigate} />

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                <Route path="/" element={<Home onNavigate={handleNavigate} />} />
                <Route
                  path="/properties/:id"
                  element={<PropertyDetail onBack={() => handleNavigate('home', '#properties')} />}
                />
                <Route
                  path="/services/:id"
                  element={<ServiceDetail onBack={() => handleNavigate('home', '#services')} />}
                />
                <Route
                  path="/journal/:id"
                  element={
                    <ArticleDetail
                      onBack={() => handleNavigate('home', '#insights')}
                      onNavigate={handleNavigate}
                    />
                  }
                />
                <Route path="*" element={<NotFound onNavigate={handleNavigate} />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSuccess={handleLeadSuccess}
        title={PROPERTIES.find((p) => p.id === pendingPropertyId)?.title || 'Luxury Residence'}
      />

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
