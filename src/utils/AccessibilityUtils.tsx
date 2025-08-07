// AccessibilityUtils.tsx - Hilfsfunktionen und Komponenten für verbesserte Barrierefreiheit
import React from 'react';
import { Box } from '@mui/material';

// Komponente, die visuell versteckt ist, aber für Screenreader zugänglich bleibt
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap'
    }}
  >
    {children}
  </Box>
);

/**
 * ScreenReaderOnly - Komponente, die Inhalte nur für Screenreader sichtbar macht
 * @param {React.PropsWithChildren<{}>} props - Die Kinder-Elemente, die nur für Screenreader sichtbar sein sollen
 */
export const ScreenReaderOnly: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <VisuallyHidden>{children}</VisuallyHidden>;
};

/**
 * Fügt ARIA-Attribute zu einem Element hinzu
 * @param {Record<string, string>} ariaAttributes - Die ARIA-Attribute, die hinzugefügt werden sollen
 * @returns {Record<string, string>} - Die formatierten ARIA-Attribute
 */
export const addAriaAttributes = (ariaAttributes: Record<string, string>): Record<string, string> => {
  const formattedAttributes: Record<string, string> = {};
  
  Object.entries(ariaAttributes).forEach(([key, value]) => {
    const formattedKey = key.startsWith('aria') ? key : `aria-${key}`;
    formattedAttributes[formattedKey] = value;
  });
  
  return formattedAttributes;
};

/**
 * Erstellt ein Objekt mit ARIA-Attributen für einen Tab
 * @param {string} id - Die ID des Tabs
 * @param {boolean} selected - Ob der Tab ausgewählt ist
 * @returns {Record<string, string>} - Die ARIA-Attribute für den Tab
 */
export const getTabAccessibilityProps = (id: string, selected: boolean): Record<string, string> => {
  return {
    id: `tab-${id}`,
    'aria-selected': selected.toString(),
    'aria-controls': `tabpanel-${id}`,
    role: 'tab',
    tabIndex: selected ? '0' : '-1'
  };
};

/**
 * Erstellt ein Objekt mit ARIA-Attributen für ein Tabpanel
 * @param {string} id - Die ID des Tabpanels
 * @returns {Record<string, string>} - Die ARIA-Attribute für das Tabpanel
 */
export const getTabPanelAccessibilityProps = (id: string): Record<string, string> => {
  return {
    id: `tabpanel-${id}`,
    'aria-labelledby': `tab-${id}`,
    role: 'tabpanel',
    tabIndex: '0'
  };
};

/**
 * Erstellt ein Objekt mit ARIA-Attributen für ein Modal
 * @param {string} id - Die ID des Modals
 * @returns {Record<string, string>} - Die ARIA-Attribute für das Modal
 */
export const getModalAccessibilityProps = (id: string): Record<string, string> => {
  return {
    id: `modal-${id}`,
    'aria-labelledby': `modal-title-${id}`,
    'aria-describedby': `modal-description-${id}`,
    role: 'dialog',
    'aria-modal': 'true'
  };
};
