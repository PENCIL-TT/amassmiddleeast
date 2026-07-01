import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import meta from '@/data/meta';

const countries = ['singapore', 'sri-lanka', 'myanmar', 'bangladesh', 'pakistan', 'home'];

const Meta = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  let pathKey = '/' + parts.join('/');

  if (parts.length > 0 && countries.includes(parts[0])) {
    pathKey = '/' + parts.slice(1).join('/');
  }

  if (pathKey === '/' || pathKey === '') {
    pathKey = '/';
  }

  if (pathKey === '/home') {
    pathKey = '/';
  }

  // Generate dynamic metadata for admin pages if not explicitly declared
  let metaData = meta[pathKey];

  try {
    const savedMeta = localStorage.getItem("admin_seo_meta");
    if (savedMeta) {
      const parsed = JSON.parse(savedMeta);
      if (parsed[pathKey]) {
        metaData = parsed[pathKey];
      }
    }
  } catch (e) {
    console.error("Failed to load custom SEO meta tags:", e);
  }

  if (!metaData) {
    if (pathKey.startsWith('/admin/') || pathKey === '/admin') {
      const subpath = pathKey === '/admin' ? 'overview' : pathKey.replace('/admin/', '');
      // Handle dynamic segments like edit/:id by taking the first path element
      const cleanSubpath = subpath.split('/').filter(Boolean)[0] || 'overview';
      const formattedSubpath = cleanSubpath
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      metaData = {
        title: `${formattedSubpath} – Admin Console – Amass Middle East`,
        description: `Manage ${formattedSubpath.toLowerCase()} settings and contents inside the secure Amass Middle East Admin Dashboard.`,
        keywords: 'admin, control center, management, amass middle east',
      };
    } else {
      metaData = meta['/'];
    }
  }

  useEffect(() => {
    document.title = metaData.title;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', metaData.description);
    setMeta('keywords', metaData.keywords);

    // Security & SEO best practice: Admin pages must not be indexed by search engines
    const isNoIndex = pathname.startsWith('/admin') || pathname === '/admin-login' || pathname === '/blog-editor' || pathname === '/blog-admin';
    if (isNoIndex) {
      setMeta('robots', 'noindex, nofollow');
      setMeta('googlebot', 'noindex, nofollow');
    } else {
      // Restore standard index,follow tags for public web pages
      setMeta('robots', 'index,follow');
      setMeta('googlebot', 'index,follow');
    }
  }, [metaData, pathname]);

  return null;
};

export default Meta;
