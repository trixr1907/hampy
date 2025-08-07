// TestimonialsRemover.tsx - Komponente zum Entfernen des Testimonials-Bereichs
import React, { useEffect } from 'react';

/**
 * Diese Komponente entfernt das Testimonials-Element aus dem DOM
 * Sie kann in die Homepage eingebunden werden, um den Testimonials-Bereich zu entfernen
 */
const TestimonialsRemover: React.FC = () => {
  useEffect(() => {
    // Funktion zum Entfernen des Testimonials-Elements
    const removeTestimonialsSection = () => {
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        // Zuerst ausblenden
        testimonialsSection.style.display = 'none';
        
        // Dann aus dem DOM entfernen
        if (testimonialsSection.parentNode) {
          testimonialsSection.parentNode.removeChild(testimonialsSection);
          console.log('Testimonials-Bereich wurde erfolgreich entfernt');
        }
      } else {
        console.log('Testimonials-Bereich wurde nicht gefunden');
      }
    };

    // Testimonials-Element entfernen, wenn die Komponente gemountet wird
    removeTestimonialsSection();

    // Falls das Element später dynamisch hinzugefügt wird, einen MutationObserver verwenden
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const newTestimonialsSection = document.getElementById('testimonials');
        if (newTestimonialsSection) {
          removeTestimonialsSection();
        }
      });
    });

    // Den gesamten Body beobachten
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });

    // Cleanup-Funktion
    return () => {
      observer.disconnect();
    };
  }, []);

  // Diese Komponente rendert nichts sichtbares
  return null;
};

export default TestimonialsRemover;
