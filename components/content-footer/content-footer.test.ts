import { mount } from '@vue/test-utils'
import contentFooter from './content-footer.vue'

describe("Content footer component", () => {
    const wrapper = mount(contentFooter);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has a govflanders components', () => {
        expect(wrapper.find('vl-content-footer').exists()).toBe(true)
    })
})