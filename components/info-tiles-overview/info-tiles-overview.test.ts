// https://test-utils.vuejs.org/api/#html
import { mount } from '@vue/test-utils'
import infoTilesOverview from './info-tiles-overview.vue'

describe("Tiles overview component", () => {
    const wrapper = mount(infoTilesOverview);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has govflanders components', () => {
        expect(wrapper.find('vl-grid').exists()).toBe(true)
        expect(wrapper.find('vl-column').exists()).toBe(true)
        expect(wrapper.find('vl-column').attributes('width-s')).toContain('12')
    })

    it('Component has at least one custom info-tile component', () => {
        expect(wrapper.html()).toContain('info-tile')
        expect(wrapper.find('info-tile').exists()).toBe(true)
    })
})