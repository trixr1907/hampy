// ServiceWorkerRegistration.tsx - Komponente zur Registrierung des Service Workers für Offline-Unterstützung
import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Button } from '@mui/material';

interface ServiceWorkerRegistrationProps {
  children: React.ReactNode;
}

const ServiceWorkerRegistration: React.FC<ServiceWorkerRegistrationProps> = ({ children }) => {
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Prüfen, ob Service Worker unterstützt wird
    if ('serviceWorker' in navigator) {
      // Service Worker registrieren
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((reg) => {
            console.log('Service Worker erfolgreich registriert mit Scope:', reg.scope);
            setRegistration(reg);

            // Auf Updates prüfen
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Neue Version verfügbar
                    setNewVersionAvailable(true);
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('Service Worker Registrierung fehlgeschlagen:', error);
          });

        // Auf Controller-Änderungen reagieren
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (document.visibilityState === 'visible') {
            window.location.reload();
          }
        });
      });
    }
  }, []);

  // Funktion zum Aktualisieren der Seite
  const updateServiceWorker = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    setNewVersionAvailable(false);
  };

  return (
    <>
      {children}
      <Snackbar
        open={newVersionAvailable}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="info" 
          variant="filled"
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={updateServiceWorker}
            >
              Aktualisieren
            </Button>
          }
        >
          Eine neue Version ist verfügbar!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ServiceWorkerRegistration;
