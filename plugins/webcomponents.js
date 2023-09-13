import VlUiVueComponents, { VlUiCore, VlUiUtil } from '@govflanders/vl-ui-design-system-vue3';

export default defineNuxtPlugin(nuxtApp => {
    // configuration of the built-in validator
    const validatorConfig = {
        inject: true,
        locale: 'nl'
    }

    // install the components library with config
    nuxtApp.vueApp.use(VlUiVueComponents, {
        validation: validatorConfig
    });
    // install the Core library with config
    nuxtApp.vueApp.use(VlUiCore, {
        validation: validatorConfig
    });
    // install the UiUtil library with config
    nuxtApp.vueApp.use(VlUiUtil, {
        validation: validatorConfig
    });
})