import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Directions } from 'react-native-gesture-handler';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  debug: false,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        search_address: 'Search address',
        about: 'About',
        about_the_project_text:
          "The Defikarte.ch app helps you locate nearby defibrillators. Use your device's navigation app to reach them quickly. The app relies on open-source data from the OpenStreetMaps (OSM) community. While not all defibrillators are included due to incomplete data, you can contribute by adding missing ones using the app.",
        the_project: 'The project',
        osm_contributors: 'OpenStreetMap contributors',
        app_sponsored_by: 'App sponsored by',
        thanks_to_all_sponsors: 'Thanks to all sponsors',
        directions: 'Directions',
        emergency_phone: 'Call {{emergencyPhone}}',
        location: 'Location',
        operator: 'Operator',
        operatorphone: 'Operator phone',
        description: 'Description',
        level: 'Level',
        openinghours: 'Opening hours',
        access: 'Access',
        indoor: 'Indoor',
      },
    },
    de: {
      translation: {
        search_address: 'Suche Adresse',
        about: 'Über',
        about_the_project_text:
          'Die Defikarte.ch-App hilft dabei, den nächsten Defibrillator in deiner Nähe zu finden. Über die Navigations-App des jeweiligen Gerätes, kannst du dich zu diesem navigieren lassen. So kann möglichst rasch einer Person in Not geholfen werden. Die Daten sind Open Source und werden von der Community in OpenStreetMaps (OSM) gepflegt und verwaltet. Da es in der Schweiz keinen kompletten Datensatz und auch keine Meldepflicht für Defibrillatoren gibt, sind nicht alle erfasst und somit auch nicht in der App ersichtlich. Die OSM-Community ist bemüht, die Daten aktuell und vollständig zu halten. Bemerkst du also, dass ein Defibrillator nicht eingetragen ist, unterstütze die Community und den guten Zweck indem du den fehlenden Defibrillator mithilfe dieser App mit Leichtigkeit erfasst.',
        the_project: 'Das Projekt',
        osm_contributors: 'OpenStreetMap Mitwirkende',
        app_sponsored_by: 'App gesponsert von',
        thanks_to_all_sponsors: 'Dank an alle Sponsoren',
        directions: 'Navigieren',
        emergency_phone: 'Notruf ({{emergencyPhone}})',
        location: 'Standort',
        operator: 'Betreiber',
        operatorphone: 'Betreiber Telefon',
        description: 'Beschreibung',
        level: 'Stockwerk',
        openinghours: 'Öffnungszeiten',
        access: 'Zugänglich',
        indoor: 'Im Gebäude',
      },
    },
    fr: {
      translation: {
        search_address: 'Rechercher une adresse',
        about: 'À propos',
        about_the_project_text:
          "Le projet Defikarte.ch vous aide à trouver le défibrillateur le plus proche de chez vous. Vous pouvez vous y rendre en utilisant l'application de navigation de votre appareil. De cette façon, une personne dans le besoin peut être aidée le plus rapidement possible. Les données sont open source et sont maintenues et gérées par la communauté dans OpenStreetMaps (OSM). Comme il n'y a pas de jeu de données complet pour les défibrillateurs en Suisse et aucune obligation de déclaration, tous ne sont pas enregistrés et ne sont donc pas visibles dans l'application. La communauté OSM s'engage à maintenir les données à jour et complètes. Donc, si vous remarquez qu'un défibrillateur n'est pas enregistré, soutenez la communauté et la bonne cause en enregistrant facilement.",
        the_project: 'Le projet',
        osm_contributors: 'Contributeurs OpenStreetMap',
        app_sponsored_by: 'App sponsorisée par',
        thanks_to_all_sponsors: 'Merci à tous les sponsors',
        directions: 'Itinéraire',
        emergency_phone: 'Call {{emergencyPhone}}',
        location: 'localisation',
        operator: 'opérateur',
        operatorphone: 'téléphone d’urgence opérateur',
        description: 'description',
        level: 'étage',
        openinghours: 'heures d’ouverture',
        access: 'accessibles dans le bâtiment',
        indoor: 'dans le bâtiment',
      },
    },
    it: {
      translation: {
        search_address: 'Cerca indirizzo',
        about: 'Di',
        about_the_project_text:
          "Il progetto Defikarte.ch ti aiuta a trovare il defibrillatore più vicino a te. Puoi raggiungerlo utilizzando l'app di navigazione del tuo dispositivo. In questo modo, una persona in difficoltà può essere aiutata il più rapidamente possibile. I dati sono open source e sono mantenuti e gestiti dalla comunità in OpenStreetMaps (OSM). Poiché non esiste un set di dati completo per i defibrillatori in Svizzera e nessun obbligo di segnalazione, non tutti sono registrati e quindi non visibili nell'app. La comunità OSM si impegna a mantenere i dati aggiornati e completi. Quindi, se noti che un defibrillatore non è registrato, sostieni la comunità e la buona causa registrando facilmente il defibrillatore mancante utilizzando questa app.",
        the_project: 'Il progetto',
        osm_contributors: 'Contributori OpenStreetMap',
        app_sponsored_by: 'App sponsorizzata da',
        thanks_to_all_sponsors: 'Grazie a tutti gli sponsor',
        directions: 'Indicazioni',
        emergency_phone: 'Call {{emergencyPhone}}',
        location: 'localizzazione',
        operator: 'operatore',
        operatorphone: 'telefono operatore',
        description: 'descrizione',
        level: 'piano',
        openinghours: 'orari di apertura',
        access: "accessibile nell'edificio",
        indoor: "nell'edificio",
      },
    },
  },
});

const deviceLanguage = getLocales()[0].languageCode || 'en';
i18n.changeLanguage(deviceLanguage);
export default i18n;
