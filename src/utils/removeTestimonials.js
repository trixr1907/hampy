// removeTestimonials.js - Hilfsfunktion zum Entfernen des Testimonials-Bereichs
/**
 * Diese Funktion entfernt das Testimonials-Element aus dem DOM
 * Kann bei Bedarf aufgerufen werden, um den Bereich zu entfernen
 */
export const removeTestimonialsSection = () => {
  // Element mit der ID "testimonials" finden und entfernen
  const testimonialsSection = document.getElementById('testimonials');
  if (testimonialsSection) {
    testimonialsSection.style.display = 'none'; // Zuerst ausblenden
    // Optional: Komplett aus dem DOM entfernen
    if (testimonialsSection.parentNode) {
      testimonialsSection.parentNode.removeChild(testimonialsSection);
    }
    console.log('Testimonials-Bereich wurde entfernt');
    return true;
  } else {
    console.log('Testimonials-Bereich wurde nicht gefunden');
    return false;
  }
};

// Funktion zum Entfernen des Testimonials-Bereichs beim Laden der Seite
export const removeTestimonialsOnLoad = () => {
  if (document.readyState === 'complete') {
    removeTestimonialsSection();
  } else {
    window.addEventListener('load', removeTestimonialsSection);
  }
};
