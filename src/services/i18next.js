 import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import en from '@locales/en.json'
 import sg from '@locales/sg.json'
 import {Languages} from "@services/languageList";
 const languageResource= {
    [Languages.en]:en,
     [Languages.sg]:sg,

 }


 i18next.use(initReactI18next).init({
     debug:true,
     compatibilityJSON:"v3",
     lng:Languages.en,
     fallbackLng:Languages.en,
     resources:languageResource,
 })


 export default i18next;





