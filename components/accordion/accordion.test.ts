// https://test-utils.vuejs.org/api/#html
import { mount } from '@vue/test-utils'
import accordion from './accordion.vue'

describe("Accordion component", () => {
    const wrapper = mount(accordion);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has govflanders components', () => {
        expect(wrapper.find('vl-grid').exists()).toBe(true)
        expect(wrapper.find('vl-accordion-list').exists()).toBe(true)
        expect(wrapper.find('vl-column').exists()).toBe(true)
        expect(wrapper.find('vl-column').attributes('width-m')).toContain('12')
    })

    it('Component has at least one acccordion', () => {
        expect(wrapper.html()).toContain('vl-accordion')
        expect(wrapper.find('vl-accordion').exists()).toBe(true)
    })
})