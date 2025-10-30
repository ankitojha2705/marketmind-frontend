import { useEffect, useState } from 'react'


function normalize(hash) {
if (!hash || hash === '#' || hash === '#/') return '/dashboard'
return hash.replace(/^#/, '')
}


export default function useHashRoute() {
  const [route, setRoute] = useState(() => {
    // Handle server-side rendering
    if (typeof window === 'undefined') return '/dashboard';
    return normalize(window.location.hash);
  });

  useEffect(() => {
    const onHashChange = () => setRoute(normalize(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    
    // Set initial route if none is set
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/dashboard';
      setRoute('/dashboard');
    }
    
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);


const navigate = (to) => { window.location.hash = `#${to}` }
return { route, navigate }
}