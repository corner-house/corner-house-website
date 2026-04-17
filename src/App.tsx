import React, { Suspense } from 'react';
import { Outlet, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import LeadCaptureModal, { LeadData } from '@/components/LeadCaptureModal';
import { PROPERTIES, SERVICES, ARTICLES } from '@/constants';

export type NavigatePage = 'home' | 'detail' | 'service' | 'article';
export type NavigateFn = (page: NavigatePage, id?: string) => void;

export interface LayoutContext {
  onNavigate: NavigateFn;
  onBack: (section?: string) => void;
}

export function useLayoutContext(): LayoutContext {
  return useOutletContext<LayoutContext>();
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

function Layout() {
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

  const handleBack = (section?: string) => {
    handleNavigate('home', section);
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

  const context: LayoutContext = { onNavigate: handleNavigate, onBack: handleBack };

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
              <Outlet context={context} />
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

// Bridge components so existing pages that consume the layout context still work.
// Each page calls useLayoutContext() directly (see step-by-step page edits),
// but this wrapper keeps the route tree tidy.
// Hub pages are lazy so the landing page (/) doesn't bundle code for
// routes the user hasn't navigated to yet. SSG will resolve the promises
// during the pre-render pass.
const LazyProperties = React.lazy(() => import('@/pages/Properties'));
const LazyServices = React.lazy(() => import('@/pages/Services'));
const LazyJournal = React.lazy(() => import('@/pages/Journal'));
const LazyPropertyDetail = React.lazy(() => import('@/pages/PropertyDetail'));
const LazyServiceDetail = React.lazy(() => import('@/pages/ServiceDetail'));
const LazyArticleDetail = React.lazy(() => import('@/pages/ArticleDetail'));
const LazyNotFound = React.lazy(() => import('@/pages/NotFound'));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, Component: Home },
      { path: 'properties', Component: LazyProperties, entry: 'src/pages/Properties.tsx' },
      {
        path: 'properties/:id',
        Component: LazyPropertyDetail,
        entry: 'src/pages/PropertyDetail.tsx',
        getStaticPaths: () => PROPERTIES.map((p) => `properties/${p.id}`),
      },
      { path: 'services', Component: LazyServices, entry: 'src/pages/Services.tsx' },
      {
        path: 'services/:id',
        Component: LazyServiceDetail,
        entry: 'src/pages/ServiceDetail.tsx',
        getStaticPaths: () => SERVICES.map((s) => `services/${s.id}`),
      },
      { path: 'journal', Component: LazyJournal, entry: 'src/pages/Journal.tsx' },
      {
        path: 'journal/:id',
        Component: LazyArticleDetail,
        entry: 'src/pages/ArticleDetail.tsx',
        getStaticPaths: () => ARTICLES.map((a) => `journal/${a.id}`),
      },
      // Static /404.html output needed by Cloudflare Pages _redirects catch-all.
      { path: '404', Component: LazyNotFound },
      { path: '*', Component: LazyNotFound },
    ],
  },
];
