// https://test-utils.vuejs.org/api/#html
import { mount } from '@vue/test-utils'
import contentHeader from './content-header.vue'

describe("Content header component", () => {
    const wrapper = mount(contentHeader);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has a govflanders components', () => {
        expect(wrapper.find('vl-content-header').exists()).toBe(true)
        expect(wrapper.find('vl-content-header-entity').exists()).toBe(true)
        expect(wrapper.find('vl-content-header-title').exists()).toBe(true)
    })
})