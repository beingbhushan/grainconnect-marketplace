import React, { useEffect } from 'react';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,mr,hi', // English, Marathi, Hindi
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        },
        'google_translate_element'
      );
    };

    // Load script if not already loaded
    if (!window.google?.translate) {
      addScript();
    } else {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-gray-600" />
      <div id="google_translate_element" className="google-translate-container"></div>
      <style jsx>{`
        .google-translate-container .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }
        .google-translate-container .goog-te-gadget .goog-te-combo {
          margin: 0 !important;
          padding: 4px 8px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          background: white !important;
          font-size: 14px !important;
          color: #374151 !important;
          outline: none !important;
        }
        .google-translate-container .goog-te-gadget .goog-te-combo:focus {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        .goog-te-menu-value {
          color: #374151 !important;
        }
        body {
          top: 0 !important;
        }
        .skiptranslate {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;