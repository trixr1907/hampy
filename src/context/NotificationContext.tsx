// NotificationContext.tsx - Kontext für Benachrichtigungen in der Anwendung
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert, Snackbar, AlertColor } from '@mui/material';

// Typen für Benachrichtigungen
interface Notification {
  message: string;
  severity: AlertColor;
  open: boolean;
}

// Kontext-Typen
interface NotificationContextType {
  notification: Notification;
  showNotification: (message: string, severity: AlertColor) => void;
  hideNotification: () => void;
}

// Standardwerte für den Kontext
const defaultNotification: Notification = {
  message: '',
  severity: 'info',
  open: false
};

// Erstellen des Kontexts
const NotificationContext = createContext<NotificationContextType>({
  notification: defaultNotification,
  showNotification: () => {},
  hideNotification: () => {}
});

// Hook für den Zugriff auf den Kontext
export const useNotification = () => useContext(NotificationContext);

// Provider-Komponente
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<Notification>(defaultNotification);

  // Benachrichtigung anzeigen
  const showNotification = (message: string, severity: AlertColor = 'info') => {
    setNotification({
      message,
      severity,
      open: true
    });
  };

  // Benachrichtigung ausblenden
  const hideNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false
    }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification
      }}
    >
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={hideNotification} 
          severity={notification.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
