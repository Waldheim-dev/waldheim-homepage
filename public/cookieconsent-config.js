import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.umd.js';

document.documentElement.classList.add('cc-darkmode','cc--tailwind');

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to 'denied' (this should happen before changing any other dataLayer)
gtag('consent', 'default', {
    [SERVICE_AD_STORAGE]: 'denied',
    [SERVICE_AD_USER_DATA]: 'denied',
    [SERVICE_AD_PERSONALIZATION]: 'denied',
    [SERVICE_ANALYTICS_STORAGE]: 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
    [SERVICE_SECURITY_STORAGE]: 'denied',
});

/** 
 * Update gtag consent according to the users choices made in CookieConsent UI
 */
function updateGtagConsent() {
    gtag('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
        [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
    });
}

CookieConsent.run({
    // Trigger consent update when user choices change
    onFirstConsent: () => {
        updateGtagConsent();
    },
    onConsent: () => {
        updateGtagConsent();
    },
    onChange: () => {
        updateGtagConsent();
    },
    guiOptions: {
        consentModal: {
            layout: "box wide",
            position: "bottom right",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {[CAT_NECESSARY]: {
        enabled: true,  // this category is enabled by default
        readOnly: true,  // this category cannot be disabled
    },
    [CAT_ANALYTICS]: {
        autoClear: {
            cookies: [
                {
                    name: /^_ga/,   // regex: match all cookies starting with '_ga'
                },
                {
                    name: '_gid',   // string: exact cookie name
                }
            ]
        },
        // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
        services: {
            [SERVICE_ANALYTICS_STORAGE]: {
                label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
            }
        }
    },
    [CAT_ADVERTISEMENT]: {
        services: {
            [SERVICE_AD_STORAGE]: {
                label: 'Enables storage (such as cookies) related to advertising.',
            },
            [SERVICE_AD_USER_DATA]: {
                label: 'Sets consent for sending user data related to advertising to Google.',
            },
            [SERVICE_AD_PERSONALIZATION]: {
                label: 'Sets consent for personalized advertising.',
            },
        }
    },
    [CAT_FUNCTIONALITY]: {
        services: {
            [SERVICE_FUNCTIONALITY_STORAGE]: {
                label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
            },
            [SERVICE_PERSONALIZATION_STORAGE]: {
                label: 'Enables storage related to personalization e.g. video recommendations.',
            },
        }
    },
    [CAT_SECURITY]: {
        services: {
            [SERVICE_SECURITY_STORAGE]: {
                label: 'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.',
            },
        }
    }
    },
    language: {
        default: "de",
        autoDetect: "browser",
        translations: {
            de: {
                consentModal: {
                    title: "Hallo Reisende, es ist Kekszeit!",
                    description: "Wir verwenden Cookies und andere Technologien, um Ihre Erfahrung auf unserer Website zu personalisieren. Durch Klicken auf \"Alle akzeptieren\" stimmen Sie der Verwendung ALLER Cookies zu. Sie können jedoch die \"Einstellungen verwalten\" besuchen, um eine kontrollierte Zustimmung zu erteilen.",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Alle ablehnen",
                    showPreferencesBtn: "Einstellungen verwalten",
                    footer: "<a href=\"datenschutz\">Datenschutz</a>"
                },
                preferencesModal: {
                    title: "Präferenzen für die Zustimmung",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Alle ablehnen",
                    savePreferencesBtn: "Einstellungen speichern",
                    closeIconLabel: "Modal schließen",
                    serviceCounterLabel: "Dienstleistungen",
                    sections: [
                        {
                            title: "Verwendung von Cookies",            
                            description: "Wir verwenden Cookies und andere Technologien, um Ihre Erfahrung auf unserer Website zu personalisieren. Durch Klicken auf \"Alle akzeptieren\" stimmen Sie der Verwendung ALLER Cookies zu. Sie können jedoch die \"Einstellungen verwalten\" besuchen, um eine kontrollierte Zustimmung zu erteilen.",
                        },
                        {
                            title: "Streng Notwendige Cookies <span class=\"pm__badge\">Immer Aktiviert</span>",
                            description: "Alle notwendigen Cookies werden für die ordnungsgemäße Funktion der Website verwendet. Sie können nicht deaktiviert werden, da sie für die ordnungsgemäße Funktion der Website erforderlich sind.",
                            linkedCategory: CAT_NECESSARY,
                        },
                        {
                            title: "Funktionalitäts Cookies",
                            description: "Diese Cookies ermöglichen es der Website, zusätzliche Funktionen und Personalisierung bereitzustellen. Sie können von uns oder von Drittanbietern festgelegt werden, deren Dienste wir auf unseren Seiten hinzugefügt haben. Wenn Sie diese Cookies nicht zulassen, funktionieren einige oder alle dieser Dienste möglicherweise nicht ordnungsgemäß.",
                            linkedCategory: CAT_ANALYTICS,
                            cookieTable: {
                                headers: {
                                    name: "Name",
                                    domain: "Service",
                                    description: "Beschreibung",
                                    expiration: "Ablauf",
                                },
                                body: [
                                    {
                                        name: "_ga",
                                        domain: "Google Analytics",
                                        description: "Cookie gesetzt von <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                                        expiration: "Ablauf nach 12 Tagen"
                                    },
                                    {
                                        name: "_gid",
                                        domain: "Google Analytics",
                                        description: "Cookie gesetzt von <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                                        expiration: "Session"
                                    }
                                ]
                            }
                        },
                        {
                            title: "Analytische Cookies",
                            description: "Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können. Sie helfen uns zu wissen, welche Seiten am beliebtesten und am wenigsten beliebt sind und wie sich Besucher auf der Website bewegen. Alle Informationen, die diese Cookies sammeln, sind aggregiert und daher anonym. Wenn Sie diese Cookies nicht zulassen, wissen wir nicht, wann Sie unsere Website besucht haben, und können deren Leistung nicht überwachen.",
                            linkedCategory: CAT_ADVERTISEMENT
                        },
                        {
                            title: "Werbung Cookies",
                            description: "Diese Cookies können von unseren Werbepartnern über unsere Website gesetzt werden. Sie können von diesen Unternehmen verwendet werden, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Anzeigen auf anderen Websites zu zeigen. Sie speichern nicht direkt personenbezogene Daten, basieren jedoch auf der eindeutigen Identifizierung Ihres Browsers und Ihres Internetgeräts. Wenn Sie diese Cookies nicht zulassen, werden Sie weniger gezielte Werbung erleben.",
                            linkedCategory: CAT_FUNCTIONALITY
                        },
                        {
                            title: 'Sicherheit',
                            description: 'Cookies, die der Sicherheit dienen, authentifizieren Benutzer, verhindern Betrug und schützen Benutzer bei der Interaktion mit einem Dienst.',
                            linkedCategory: CAT_SECURITY,
                        },
                        {
                            title: "Weitere Informationen",
                            description: "Wenn Sie Fragen zu meiner Cookie-Politik und Ihren Wahlmöglichkeiten haben, wenden Sie sich bitte an <a class=\"cc__link\" href=\"mailto:kontakt@waldheim.dev\">Kontaktieren Sie mich</a>."
                        }
                    ]
                }
            }
        }
    }
});