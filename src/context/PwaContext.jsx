import React, { createContext, useContext, useState, useEffect } from 'react';

const PwaContext = createContext(null);

export function PwaProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    // 1. Check if already installed / running in standalone mode
    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsInstalled(Boolean(isStandalone));
    };

    checkInstalled();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e) => setIsInstalled(e.matches);
    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch {
      mediaQuery.addListener(handleChange);
    }

    // 2. Detect iOS device (iPhone / iPad / iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // 3. Listen for native beforeinstallprompt event (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e) => {
      // Prevent default mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 5. Register Service Worker
    if ('serviceWorker' in navigator && (process.env.NODE_ENV === 'production' || window.location.protocol === 'https:')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // Check for updates periodically
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('Nueva versión de By Sandrit disponible.');
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.warn('Error al registrar Service Worker PWA:', error);
          });
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const triggerInstall = async () => {
    // If native prompt is available (Android, Chrome, Edge)
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
        setShowInstallModal(false);
      }
      return outcome;
    } else {
      // Show instructional modal (iOS or unsupported browsers)
      setShowInstallModal(true);
      return null;
    }
  };

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        deferredPrompt,
        showInstallModal,
        setShowInstallModal,
        triggerInstall
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
}
