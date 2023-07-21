"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: "Multi-language app",
        trash: "Trash",
        archive: "Archive",
        home: "Home",
        modalColorPick: "Choose a color",
        createButton: "Create",
        inputNewCardTitle: "Add a title here...",
        inputNewCardContent: "and some content too.",
        searchPlaceholder: "Escribe una palabra clave",
        searchPlaceholder: "Write a key word",
        firstCardTitle: "Mmm, seems like there is nothing here.",
        cancel: "Cancel",
        continue: "Continue",
        deletionWarning: "Once deleted, you can not have it back.",
        incompleteFields: "Mind not to leave empty fields, please.",
        missingKeyWord: "Write a key word to do a search."
      },
    },
    es: {
      translation: {
        title: "SmartyCards",
        trash: "Papelera",
        archive: "Archivo",
        home: "Inicio",
        modalColorPick: "Elige un color",
        createButton: "Crear",
        inputNewCardTitle: "Agrega un título aquí...",
        inputNewCardContent: "y un poco de contenido por acá.",
        searchPlaceholder: "Escribe una palabra clave",
        firstCardTitle: "Mmm, parece que no hay nada por aquí.",
        cancel: "Cancelar",
        continue: "Continuar",
        deletionWarning: "Una vez eliminada, no podrás recuperarla.",
        incompleteFields: 'Por favor, no dejes espacios vacíos.',
        missingKeyWord: "Escribe una palabra para hacer la búsqueda."
      },
    },
  },
});

export default i18n;
