import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import PropertyDetail from '@/pages/PropertyDetail';
import ServiceDetail from '@/pages/ServiceDetail';
import LeadCaptureModal, { LeadData } from '@/components/LeadCaptureModal';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES, SERVICES } from '@/constants';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'detail' | 'service'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | undefined>();
  const [selectedServiceId, setSelectedServiceId] = React.useState<string | undefined>();
  const [isLeadCaptured, setIsLeadCaptured] = React.useState(() => {
    return localStorage.getItem('corner_home_lead_captured') === 'true';
  });
  const [isLeadModalOpen, setIsLeadModalOpen] = React.useState(false);
  const [pendingPropertyId, setPendingPropertyId] = React.useState<string | undefined>();

  const handleNavigate = (page: 'home' | 'detail' | 'service', id?: string) => {
    if (page === 'home') {
      setCurrentPage('home');
      setSelectedPropertyId(undefined);
      setSelectedServiceId(undefined);
      
      if (id && id.startsWith('#')) {
        const sectionId = id.substring(1);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (page === 'detail') {
      // LEAD GATE for Properties
      if (!isLeadCaptured) {
        setPendingPropertyId(id);
        setIsLeadModalOpen(true);
        return;
      }
      
      setCurrentPage('detail');
      setSelectedPropertyId(id);
      setSelectedServiceId(undefined);
      window.scrollTo(0, 0);
    } else if (page === 'service') {
      // NO GATE for Services
      setCurrentPage('service');
      setSelectedServiceId(id);
      setSelectedPropertyId(undefined);
      window.scrollTo(0, 0);
    }
  };

  const handleLeadSuccess = (data: LeadData) => {
    console.log('Lead captured:', data);
    setIsLeadCaptured(true);
    localStorage.setItem('corner_home_lead_captured', 'true');
    setIsLeadModalOpen(false);
    
    // Proceed to the property that was clicked
    if (pendingPropertyId) {
      setCurrentPage('detail');
      setSelectedPropertyId(pendingPropertyId);
      setSelectedServiceId(undefined);
      setPendingPropertyId(undefined);
      window.scrollTo(0, 0);
    }
  };

  const selectedEntity = currentPage === 'detail' 
    ? PROPERTIES.find(p => p.id === selectedPropertyId)
    : SERVICES.find(s => s.id === selectedServiceId);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar onNavigate={handleNavigate} />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home onNavigate={handleNavigate} />
            </motion.div>
          ) : currentPage === 'detail' ? (
            <motion.div
              key={`detail-${selectedPropertyId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {selectedPropertyId && (
                <PropertyDetail 
                  propertyId={selectedPropertyId} 
                  onBack={() => handleNavigate('home')} 
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`service-${selectedServiceId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {selectedServiceId && (
                <ServiceDetail 
                  serviceId={selectedServiceId} 
                  onBack={() => handleNavigate('home')} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LeadCaptureModal 
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSuccess={handleLeadSuccess}
        title={PROPERTIES.find(p => p.id === pendingPropertyId)?.title || 'Luxury Residence'}
      />

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
