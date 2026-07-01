import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 pt-24 max-w-4xl">
        <div className="prose prose-lg max-w-none text-black">
          
          <h1 className="text-4xl font-bold mb-8 text-black">Privacy Policy</h1>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">Introduction</h2>
          <p className="mb-6 text-black">
            Welcome to Amass Middle East Shipping Services LLC ["Amass Middle East Shipping Services LLC", "Amass Middle East", "we", "our", "us"]. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>

          <p className="mb-6 text-black">
            We urge you to carefully read the following to comprehend how we collect, utilize, and safeguard your personal information. The policy also outlines your options concerning the use, accessibility, and correction of your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">Our Commitment to Privacy</h2>

          <p className="mb-4 text-black">
            <strong>Limited Data Collection:</strong> At Amass Middle East, we adhere to strict privacy principles by collecting only the essential information necessary for efficient communication. This streamlined approach minimizes exposure of personal details and ensures robust security measures.
          </p>

          <p className="mb-4 text-black">
            <strong>Voluntary Disclosure:</strong> Users at Amass Middle East voluntarily decide what information they choose to share. We respect each user's comfort levels regarding information disclosure.
          </p>

          <p className="mb-4 text-black">
            <strong>Purposeful Communication:</strong> All information collected is exclusively used for communication-related activities such as responding to inquiries, providing updates, and maintaining service interactions.
          </p>

          <p className="mb-6 text-black">
            <strong>User Empowerment:</strong> At Amass Middle East, users have full control over the information they share and manage their privacy preferences as desired.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">What Constitutes Personal Information?</h2>

          <p className="mb-4 text-black">
            <strong>Personal Information:</strong> At Amass Middle East, "Personal Information" refers to any data that identifies or can be used to identify an individual, such as name, address, contact details, identification numbers, location data, and other identifiers.
          </p>

          <p className="mb-6 text-black">
            <strong>Other Information:</strong> Includes anonymized or aggregated data that cannot be used to identify an individual, such as website usage statistics.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">What Data Do We Gather and When?</h2>

          <p className="mb-4 text-black">
            At Amass Middle East, we gather essential information only when voluntarily provided by the user.
          </p>

          <p className="mb-4 text-black"><strong>Name:</strong> Provided voluntarily for direct communication.</p>
          <p className="mb-4 text-black"><strong>Email Address:</strong> Used for communication and updates.</p>
          <p className="mb-4 text-black"><strong>Phone Number:</strong> Optionally provided for support or inquiries.</p>
          <p className="mb-6 text-black"><strong>Location:</strong> Helps tailor communication and services.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">User Choice and Control</h2>

          <p className="mb-4 text-black">
            <strong>Opt-In Engagement:</strong> Users provide consent before sharing any details with Amass Middle East.
          </p>

          <p className="mb-4 text-black">
            <strong>Communication Preferences:</strong> Users control the type and frequency of communication they receive.
          </p>

          <p className="mb-6 text-black">
            <strong>Data Collection Practices:</strong> Amass Middle East follows strict security practices to protect user data.
          </p>

          <p className="mb-4 text-black">
            <strong>Logs:</strong> We track pages visited, device information, browser version, and IP-based approximate location to improve our services.
          </p>

          <p className="mb-4 text-black">
            <strong>Cookies:</strong> Used to recognize returning users and enhance service quality.
          </p>

          <p className="mb-4 text-black">
            <strong>Web Beacons:</strong> Used to track email engagement and optimize content.
          </p>

          <p className="mb-6 text-black">
            <strong>Local Storage:</strong> Stores preferences and enhances performance.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">How We Utilize the Collected Information</h2>

          <p className="mb-4 text-black">
            At Amass Middle East, collected information is used to personalize user experiences, improve services, enhance communication, ensure security, support transactions, and meet legal obligations.
          </p>

          <p className="mb-4 text-black"><strong>Personalizing User Experience:</strong> Tailored content and responses.</p>
          <p className="mb-4 text-black"><strong>Enhancing Communication:</strong> For inquiries, updates, and service information.</p>
          <p className="mb-4 text-black"><strong>Improving Services:</strong> Data-driven service enhancements.</p>
          <p className="mb-4 text-black"><strong>Ensuring Security:</strong> Monitoring and preventing unauthorized access.</p>
          <p className="mb-4 text-black"><strong>Marketing (with consent):</strong> Sending newsletters and offers.</p>
          <p className="mb-6 text-black"><strong>Compliance:</strong> Legal obligations and requests.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">How We Share Information with Third Parties</h2>

          <p className="mb-4 text-black">
            Amass Middle East only shares information under strict guidelines and when necessary.
          </p>

          <p className="mb-4 text-black"><strong>Service Providers:</strong> Used for operations such as delivery, support, IT, marketing, and payment processing.</p>

          <p className="mb-4 text-black">
            <strong>Business Partners:</strong> For co-branded services, requiring equal privacy protection.
          </p>

          <p className="mb-4 text-black"><strong>Legal Compliance:</strong> Shared only when required by law.</p>

          <p className="mb-4 text-black">
            <strong>Corporate Transactions:</strong> Data may transfer in mergers, acquisitions, or restructuring.
          </p>

          <p className="mb-4 text-black">
            <strong>Consent:</strong> Shared only when users explicitly agree.
          </p>

          <p className="mb-4 text-black"><strong>Aggregated Data:</strong> Used for analytics without identifying users.</p>

          <p className="mb-6 text-black">
            <strong>Advertising & Social Media:</strong> Shared according to the platform’s privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">How We Protect Your Information</h2>

          <p className="mb-4 text-black"><strong>Data Encryption</strong></p>
          <p className="mb-4 text-black"><strong>Secure Access Controls</strong></p>
          <p className="mb-4 text-black"><strong>Regular Security Audits</strong></p>
          <p className="mb-4 text-black"><strong>Firewall & Intrusion Detection</strong></p>
          <p className="mb-4 text-black"><strong>Data Minimization</strong></p>
          <p className="mb-4 text-black"><strong>Software Updates</strong></p>
          <p className="mb-4 text-black"><strong>Employee Training</strong></p>
          <p className="mb-4 text-black"><strong>Physical Security</strong></p>
          <p className="mb-4 text-black"><strong>Incident Response Plan</strong></p>
          <p className="mb-6 text-black"><strong>Vendor Security</strong></p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">Your Choices</h2>

          <p className="mb-4 text-black"><strong>Opt-In / Opt-Out Options</strong></p>
          <p className="mb-4 text-black"><strong>Access & Update Information</strong></p>
          <p className="mb-4 text-black"><strong>Data Portability</strong></p>
          <p className="mb-4 text-black"><strong>Deleting Information</strong></p>
          <p className="mb-4 text-black"><strong>Cookie Management</strong></p>
          <p className="mb-4 text-black"><strong>Interest-Based Advertising Controls</strong></p>
          <p className="mb-4 text-black"><strong>Restricting Processing</strong></p>
          <p className="mb-4 text-black"><strong>Right to Object</strong></p>
          <p className="mb-4 text-black"><strong>Withdraw Consent</strong></p>
          <p className="mb-6 text-black"><strong>Verification for Security</strong></p>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
