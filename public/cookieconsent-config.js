import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0-rc.17/dist/cookieconsent.umd.js';

document.documentElement.classList.add('cc-darkmode','cc--tailwind');

CookieConsent.run({
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
    categories: {
        necessary: {
            readOnly: true
        },
        functionality: {},
        analytics: {
            readOnly: false,
            autoClear: {
                cookies: [
                    {
                        name: /^(_ga)/      //regex
                    },
                    {
                        name: '_gid'        //string
                    }
                ]
            }
        },
        marketing: {}
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
                    footer: "<a href=\"privacy\">Datenschutz</a>"
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
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        },
                        {
                            title: "Streng Notwendige Cookies <span class=\"pm__badge\">Immer Aktiviert</span>",
                            description: "Alle notwendigen Cookies werden für die ordnungsgemäße Funktion der Website verwendet. Sie können nicht deaktiviert werden, da sie für die ordnungsgemäße Funktion der Website erforderlich sind.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Funktionalitäts Cookies",
                            description: "Diese Cookies ermöglichen es der Website, zusätzliche Funktionen und Personalisierung bereitzustellen. Sie können von uns oder von Drittanbietern festgelegt werden, deren Dienste wir auf unseren Seiten hinzugefügt haben. Wenn Sie diese Cookies nicht zulassen, funktionieren einige oder alle dieser Dienste möglicherweise nicht ordnungsgemäß.",
                            linkedCategory: "functionality"
                        },
                        {
                            title: "Analytische Cookies",
                            description: "Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können. Sie helfen uns zu wissen, welche Seiten am beliebtesten und am wenigsten beliebt sind und wie sich Besucher auf der Website bewegen. Alle Informationen, die diese Cookies sammeln, sind aggregiert und daher anonym. Wenn Sie diese Cookies nicht zulassen, wissen wir nicht, wann Sie unsere Website besucht haben, und können deren Leistung nicht überwachen.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Werbung Cookies",
                            description: "Diese Cookies können von unseren Werbepartnern über unsere Website gesetzt werden. Sie können von diesen Unternehmen verwendet werden, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Anzeigen auf anderen Websites zu zeigen. Sie speichern nicht direkt personenbezogene Daten, basieren jedoch auf der eindeutigen Identifizierung Ihres Browsers und Ihres Internetgeräts. Wenn Sie diese Cookies nicht zulassen, werden Sie weniger gezielte Werbung erleben.",
                            linkedCategory: "marketing"
                        },
                        {
                            title: "Weitere Informationen",
                            description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"mailto:kontakt@waldheim.dev\">contact me</a>."
                        }
                    ]
                }
            }
        }
    }
});