// i18n
import i18next from "i18next";
// import { initReactI18next } from "react-i18next";

// translations
import translationEn from '../locales/en/translate.json';
import translationFr from '../locales/fr/translate.json';

// resources
const resources = {
    en: {
        translation: translationEn
    },
    fr: {
        translation: translationFr
    }
}

// i18n initialisation
i18next.init({
    interpolation: {escapeValue: false},
    lng: "fr",
    resources: resources
})

export default i18next;
