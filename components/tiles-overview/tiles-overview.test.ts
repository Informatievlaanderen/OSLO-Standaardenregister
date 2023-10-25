// https://test-utils.vuejs.org/api/#html
import { mount } from '@vue/test-utils'
import tilesOverview from './tiles-overview.vue'

describe("Tiles overview component", () => {
    const wrapper = mount(tilesOverview);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has govflanders components', () => {
        expect(wrapper.find('vl-grid').exists()).toBe(true)
        expect(wrapper.find('vl-infoblock').exists()).toBe(true)
        expect(wrapper.find('vl-column').exists()).toBe(true)
        expect(wrapper.find('vl-column').attributes('width-s')).toContain('12')
    })

    it('Component has at least one custom tile component', () => {
        expect(wrapper.html()).toContain('tile')
        expect(wrapper.find('tile').exists()).toBe(true)
    })
})