import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'welcome.title': 'Hello {{firstname}}!',
      'activity-list.title': 'Welcome to InMotion!',
      'activity-list.explanation': 'We will generate a video of your activities from the past 7 days:',
      'activity-list-item.view-on-strava': 'View on Strava',
      'preview-zone.show': 'Show preview',
      'request-form.request-render': 'Request render',
      'render-list.created': 'created',
      'render-list.rendering': 'rendering',
      'render-list.ready': 'ready',
      'render-list.error': 'in error',
      'render-list.download-video': 'Download video {{id}} from {{date}}',
      'render-list.video-request': 'Video request {{id}} from {{date}} is {{status}}',
      'intro.title': '{{firstname}}’s past week activities',
      'intro.from-to': '(from {{from}} to {{to}})',
      'outro.last-period': 'This past 7 days:',
      'activity-data-detail.duration': 'Duration',
      'activity-data-detail.distance': 'Distance',
      'activity-data-detail.elevation': 'Elevation gain',
    },
  },
  fr: {
    translation: {
      'welcome.title': 'Bonjour {{firstname}} !',
      'activity-list.title': 'Bienvenue sur InMotion !',
      'activity-list.explanation': 'Nous allons produire une vidéo de vos activités des 7 derniers jours :',
      'activity-list-item.view-on-strava': 'Voir sur Strava',
      'preview-zone.show': 'Afficher l’aperçu',
      'request-form.request-render': 'Générer la vidéo',
      'render-list.created': 'créée',
      'render-list.rendering': 'en cours',
      'render-list.ready': 'prête',
      'render-list.error': 'en erreur',
      'render-list.download-video': 'Télécharger la vidéo {{id}} du {{date}}',
      'render-list.video-request': 'La requête de la vidéo {{id}} du {{date}} est {{status}}',
      'intro.title': 'Les 7 derniers jours de {{firstname}}',
      'intro.from-to': '(du {{from}} au {{to}})',
      'outro.last-period': 'Ces 7 derniers jours :',
      'activity-data-detail.duration': 'Temps',
      'activity-data-detail.distance': 'Distance',
      'activity-data-detail.elevation': 'Dénivelé +',
    },
  },
};

// @ts-ignore
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
