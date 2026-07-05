
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as ToastToaster } from '@/components/ui/toaster';
import CountryRedirect from '@/components/CountryRedirect';
import Meta from '@/components/Meta';

// Page imports
import Index from '@/pages/Index';
import SriLankaHome from '@/pages/SriLankaHome';
import MyanmarHome from '@/pages/MyanmarHome';
import BangladeshHome from '@/pages/BangladeshHome';
import PakistanHome from '@/pages/PakistanHome';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import GlobalPresence from '@/pages/GlobalPresence';
import GlobalPresenceM from '@/pages/GlobalPresenceM';
import GlobalPresenceB from '@/pages/GlobalPresenceB';
import AboutUs from '@/pages/aboutus';
import Gallery from '@/pages/Gallery';
import Career from '@/pages/Career';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import BlogAdmin from '@/pages/BlogAdmin';
import BlogEditor from '@/pages/BlogEditor';
import Blog from '@/pages/Blog';
import BlogDetail from '@/components/BlogDetail';
import NewsDetailPage from '@/pages/NewsDetailPage';
import NewsOverviewPage from '@/pages/NewsOverviewPage';
import Projects from '@/pages/Projects';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import Dmacharges from '@/pages/Dmacharges';
import NotFound from '@/pages/NotFound';

// Service pages
import SeaFreight from '@/pages/services/SeaFreight';
import AirFreight from '@/pages/services/AirFreight';
import CustomsClearance from '@/pages/services/CustomsClearance';
import Warehousing from '@/pages/services/Warehousing';
import Consolidation from '@/pages/services/Consolidation';
import ProjectCargo from '@/pages/services/ProjectCargo';
import LiquidCargo from '@/pages/services/LiquidCargo';
import ThirdPartyLogistics from '@/pages/services/ThirdPartyLogistics';
import LinerAgency from '@/pages/services/LinerAgency';
import LCL from '@/pages/services/LCL';
import CFS from '@/pages/services/CFS';

import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';

// Dashboard components
import DashboardOverview from '@/pages/dashboard/Overview';
import DashboardShipments from '@/pages/dashboard/Shipments';
import DashboardDocuments from '@/pages/dashboard/Documents';
import DashboardPayments from '@/pages/dashboard/Payments';
import DashboardSettings from '@/pages/dashboard/Settings';

// Admin components
import AdminOverview from '@/pages/admin/Overview';
import AdminUsers from '@/pages/admin/Users';
import AdminShipmentsManagement from '@/pages/admin/ShipmentsManagement';
import AdminPaymentsManagement from '@/pages/admin/PaymentsManagement';
import AdminSystemSettings from '@/pages/admin/SystemSettings';
import AdminAboutPage from '@/pages/admin/AboutPage';
import AdminAboutSection from '@/pages/admin/AboutSection';
import AdminStatsSection from '@/pages/admin/StatsSection';
import AdminServicesSection from '@/pages/admin/ServicesSection';
import AdminContactForm from '@/pages/admin/ContactForm';
import AdminGallery from '@/pages/admin/Gallery';
import AdminCareer from '@/pages/admin/Career';
import AdminServicesPage from '@/pages/admin/ServicesPage';
import AdminServicesDetails from '@/pages/admin/ServicesDetails';
import AdminGlobalPresence from '@/pages/admin/GlobalPresence';
import AdminContactPage from '@/pages/admin/ContactPage';
import AdminSwitchCountry from '@/pages/admin/SwitchCountry';
import AdminSocialLinks from '@/pages/admin/SocialLinks';
import AdminSEOMetaManagement from '@/pages/admin/SEOMetaManagement';
import AdminFooterManagement from '@/pages/admin/FooterManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Services array type
type ServiceRoute = {
  path: string;
  component: React.ComponentType;
};

// All services
const serviceRoutes: ServiceRoute[] = [
  { path: 'sea-freight', component: SeaFreight },
  { path: 'air-freight', component: AirFreight },
  { path: 'customs-clearance', component: CustomsClearance },
  { path: 'warehousing', component: Warehousing },
  { path: 'consolidation', component: Consolidation },
  { path: 'project-cargo', component: ProjectCargo },
  { path: 'liquid-cargo', component: LiquidCargo },
  { path: 'third-party-logistics', component: ThirdPartyLogistics },
  { path: 'liner-agency', component: LinerAgency },
  { path: 'lcl', component: LCL },
  { path: 'cfs', component: CFS },
];

// Country prefixes
const countries = [
  'singapore', 'sri-lanka', 'myanmar', 'bangladesh', 'pakistan', 'home',
  'china', 'malaysia', 'indonesia', 'thailand', 'india', 'australia', 
  'qatar', 'saudi-arabia', 'uae', 'usa', 'uk'
];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CountryRedirect />
          <Meta />
          <div className="App">
            <Routes>
              {/* Home routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Index />} />
              <Route path="/sri-lanka/home" element={<SriLankaHome />} />
              <Route path="/myanmar/home" element={<MyanmarHome />} />
              <Route path="/dma-charges" element={<Dmacharges />} />
              
              <Route path="/bangladesh/home" element={<BangladeshHome />} />
              <Route path="/pakistan/home" element={<PakistanHome />} />

              {/* Global pages */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/career" element={<Career />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/news" element={<NewsOverviewPage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/blog-editor" element={<BlogEditor />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/sri-lanka/global-presence" element={<GlobalPresence />} />
              <Route path="/pakistan/global-presence" element={<GlobalPresence />} />
              <Route path="/myanmar/global-presence" element={<GlobalPresenceM />} />
              <Route path="/bangladesh/global-presence" element={<GlobalPresenceB />} />

              {/* Simple Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* Country-specific pages */}
              {countries.flatMap((country) => [
                country !== 'sri-lanka' && country !== 'myanmar' && country !== 'bangladesh' && country !== 'pakistan' ? (
                  <Route key={`home-${country}`} path={`/${country}/home`} element={<Index />} />
                ) : null,
                <Route key={`contact-${country}`} path={`/${country}/contact`} element={<Contact />} />,
                <Route key={`about-${country}`} path={`/${country}/about-us`} element={<AboutUs />} />,
                <Route key={`gallery-${country}`} path={`/${country}/gallery`} element={<Gallery />} />,
                <Route key={`career-${country}`} path={`/${country}/career`} element={<Career />} />,
                <Route key={`services-${country}`} path={`/${country}/services`} element={<Services />} />,
                <Route key={`blog-${country}`} path={`/${country}/blog`} element={<Blog />} />,
                <Route key={`blogs-${country}`} path={`/${country}/blogs`} element={<Blog />} />,
                <Route key={`blog-slug-${country}`} path={`/${country}/blog/:slug`} element={<BlogDetail />} />,
                <Route key={`projects-${country}`} path={`/${country}/projects`} element={<Projects />} />
              ].filter(Boolean))}

              {/* Service detail pages for global and each country */}
              {serviceRoutes.flatMap((service) => [
                <Route key={`global-${service.path}`} path={`/services/${service.path}`} element={<service.component />} />,
                ...countries.map((country) => (
                  <Route
                    key={`${country}-${service.path}`}
                    path={`/${country}/services/${service.path}`}
                    element={<service.component />}
                  />
                ))
              ])}

              {/* Auth routes */}
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* User Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="overview" element={<DashboardOverview />} />
                <Route path="shipments" element={<DashboardShipments />} />
                <Route path="documents" element={<DashboardDocuments />} />
                <Route path="payments" element={<DashboardPayments />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>

              {/* Admin Dashboard */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="overview" element={<AdminOverview />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="shipments" element={<AdminShipmentsManagement />} />
                <Route path="payments" element={<AdminPaymentsManagement />} />
                <Route path="settings" element={<AdminSystemSettings />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="blog/edit/:id?" element={<BlogEditor />} />
                <Route path="about-page" element={<AdminAboutPage />} />
                <Route path="about-section" element={<AdminAboutSection />} />
                <Route path="stats-section" element={<AdminStatsSection />} />
                <Route path="services-section" element={<AdminServicesSection />} />
                <Route path="services-page" element={<AdminServicesPage />} />
                <Route path="services-details" element={<AdminServicesDetails />} />
                <Route path="contact-form" element={<AdminContactForm />} />
                <Route path="contact-page" element={<AdminContactPage />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="career" element={<AdminCareer />} />
                <Route path="global-presence" element={<AdminGlobalPresence />} />
                <Route path="switch-country" element={<AdminSwitchCountry />} />
                <Route path="social-links" element={<AdminSocialLinks />} />
                <Route path="seo-meta" element={<AdminSEOMetaManagement />} />
                <Route path="footer" element={<AdminFooterManagement />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <SonnerToaster />
          <ToastToaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
