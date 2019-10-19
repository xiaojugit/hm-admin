import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import zhCnLocale from 'iview/src/locale/lang/zh-CN'


Vue.use(VueI18n);

let lang = 'zh-CN';
Vue.config.lang = lang;

Vue.locale = () => {};
const messages = {
    'zh-CN': Object.assign(zhCnLocale, customZhCn)
};

const i18n = new VueI18n({
    locale: lang,
    messages
});

export default i18n
