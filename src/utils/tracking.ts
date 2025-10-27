/**
 * Conversion Tracking Utilities
 * 
 * Usage:
 * import { trackEvent, EVENTS } from '../utils/tracking';
 * trackEvent(EVENTS.CONTACT_FORM_SUBMIT, { service: 'devsecops' });
 */

// Type definitions
interface EventParams {
  [key: string]: string | number | boolean;
}

// Event tracking function
export const trackEvent = (eventName: string, params?: EventParams): void => {
  if (typeof window === 'undefined') return;
  
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, params);
    console.log('📊 GA4 Event:', eventName, params);
  }
  
  // Sentry Breadcrumb (optional)
  if (window.Sentry) {
    window.Sentry.addBreadcrumb({
      category: 'user-action',
      message: eventName,
      data: params,
      level: 'info'
    });
  }
};

// Predefined Events
export const EVENTS = {
  // Service Conversions
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  SERVICE_INQUIRY: 'service_inquiry',
  CALL_SCHEDULED: 'call_scheduled',
  QUOTE_REQUEST: 'quote_request',
  
  // Ecodrive Conversions
  ECODRIVE_SIGNUP_START: 'ecodrive_signup_start',
  ECODRIVE_TRIAL_START: 'ecodrive_trial_start',
  ECODRIVE_PURCHASE: 'ecodrive_purchase',
  ECODRIVE_FEATURE_CLICK: 'ecodrive_feature_click',
  
  // Silvacore Conversions
  SILVACORE_DEMO_REQUEST: 'silvacore_demo_request',
  SILVACORE_SIGNUP: 'silvacore_signup',
  SILVACORE_TRIAL_START: 'silvacore_trial_start',
  SILVACORE_FEATURE_CLICK: 'silvacore_feature_click',
  
  // Socialverse Conversions
  SOCIALVERSE_WAITLIST: 'socialverse_waitlist',
  SOCIALVERSE_INFO_REQUEST: 'socialverse_info_request',
  
  // Button/CTA Conversions
  BUTTON_CLICK: 'button_click',
  CTA_HOMEPAGE_CONTACT: 'cta_homepage_contact',
  CTA_HOMEPAGE_REFERENCES: 'cta_homepage_references',
  CTA_SERVICE_DEVSECOPS: 'cta_service_devsecops',
  CTA_SERVICE_DEVELOPMENT: 'cta_service_development',
  CTA_SERVICE_DESIGN: 'cta_service_design',
  CTA_SERVICE_IT: 'cta_service_it',
  CTA_PRICING_SERVICE: 'cta_pricing_service',
  CTA_PRICING_ECODRIVE: 'cta_pricing_ecodrive',
  CTA_PRICING_SILVACORE: 'cta_pricing_silvacore',
  CTA_PRICING_SOCIALVERSE: 'cta_pricing_socialverse',
  
  // Engagement Events
  SCROLL_DEPTH_25: 'scroll_depth_25',
  SCROLL_DEPTH_50: 'scroll_depth_50',
  SCROLL_DEPTH_75: 'scroll_depth_75',
  SCROLL_DEPTH_100: 'scroll_depth_100',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
  
  // Navigation
  NAV_CLICK: 'nav_click',
  FOOTER_LINK_CLICK: 'footer_link_click',
  CTA_CLICK: 'cta_click',
  EXTERNAL_LINK_CLICK: 'external_link_click'
} as const;

// Scroll Depth Tracking
export const initScrollDepthTracking = (): void => {
  if (typeof window === 'undefined') return;
  
  const scrollDepths = [25, 50, 75, 100];
  const trackedDepths = new Set<number>();
  
  // Throttle-Funktion für Performance (reduziert Main Thread Blocking)
  let scrollTimeout: number | null = null;
  const throttleDelay = 500; // ms
  
  const handleScroll = () => {
    // Throttle: Nur alle 500ms ausführen
    if (scrollTimeout !== null) return;
    
    scrollTimeout = window.setTimeout(() => {
      const scrollPercent = 
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          // requestIdleCallback für non-blocking Event-Tracking
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              trackEvent(`scroll_depth_${depth}`, { 
                page: window.location.pathname 
              });
            });
          } else {
            // Fallback für Browser ohne requestIdleCallback
            setTimeout(() => {
              trackEvent(`scroll_depth_${depth}`, { 
                page: window.location.pathname 
              });
            }, 0);
          }
          trackedDepths.add(depth);
        }
      });
      
      scrollTimeout = null;
    }, throttleDelay);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (scrollTimeout !== null) {
      clearTimeout(scrollTimeout);
    }
    window.removeEventListener('scroll', handleScroll);
  });
};

// Video Tracking
export const trackVideo = (videoElement: HTMLVideoElement, videoName: string): void => {
  let hasTrackedPlay = false;
  let hasTrackedComplete = false;
  
  videoElement.addEventListener('play', () => {
    if (!hasTrackedPlay) {
      trackEvent(EVENTS.VIDEO_PLAY, { video_name: videoName });
      hasTrackedPlay = true;
    }
  });
  
  videoElement.addEventListener('ended', () => {
    if (!hasTrackedComplete) {
      trackEvent(EVENTS.VIDEO_COMPLETE, { video_name: videoName });
      hasTrackedComplete = true;
    }
  });
};

// Button/CTA Tracking
export const trackButtonClick = (
  buttonElement: HTMLElement, 
  eventName: string, 
  additionalParams?: EventParams
): void => {
  const params: EventParams = {
    button_text: buttonElement.textContent?.trim() || '',
    button_location: window.location.pathname,
    ...additionalParams
  };
  
  trackEvent(eventName, params);
};

// Auto-track all CTA buttons with data-track attribute
export const initButtonTracking = (): void => {
  if (typeof document === 'undefined') return;
  
  // Track buttons with data-track-event attribute
  document.querySelectorAll<HTMLElement>('[data-track-event]').forEach(button => {
    button.addEventListener('click', () => {
      const eventName = button.getAttribute('data-track-event') || EVENTS.BUTTON_CLICK;
      const category = button.getAttribute('data-track-category') || 'button';
      const label = button.getAttribute('data-track-label') || button.textContent?.trim() || '';
      const value = button.getAttribute('data-track-value');
      
      trackButtonClick(button, eventName, {
        category,
        label,
        ...(value && { value: parseInt(value) })
      });
    });
  });
  
  // Auto-track pricing buttons
  document.querySelectorAll<HTMLAnchorElement>('a[href*="register"], a[href*="/kontakt"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    const text = link.textContent?.trim() || '';
    const isExternal = href.startsWith('http');
    
    link.addEventListener('click', () => {
      let eventName: string = EVENTS.CTA_CLICK;
      const params: EventParams = {
        link_text: text,
        link_url: href,
        link_type: isExternal ? 'external' : 'internal'
      };
      
      // Detect product-specific events
      if (href.includes('silvacore')) {
        if (text.toLowerCase().includes('kostenlos') || text.toLowerCase().includes('starten')) {
          eventName = EVENTS.SILVACORE_SIGNUP;
          params.plan = 'free';
        } else if (text.toLowerCase().includes('professional')) {
          eventName = EVENTS.SILVACORE_SIGNUP;
          params.plan = 'professional';
        } else if (text.toLowerCase().includes('demo')) {
          eventName = EVENTS.SILVACORE_DEMO_REQUEST;
        }
      } else if (href.includes('ecodrive')) {
        eventName = EVENTS.ECODRIVE_SIGNUP_START;
      } else if (href.includes('socialverse')) {
        eventName = EVENTS.SOCIALVERSE_WAITLIST;
      } else if (href.includes('/kontakt')) {
        eventName = EVENTS.SERVICE_INQUIRY;
      }
      
      trackEvent(eventName, params);
    });
  });
};

// Auto-init scroll tracking on page load
if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', () => {
    initScrollDepthTracking();
    initButtonTracking();
  });
}

// Type augmentation for window
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: EventParams
    ) => void;
    Sentry?: {
      addBreadcrumb: (breadcrumb: any) => void;
    };
  }
}

export default trackEvent;
