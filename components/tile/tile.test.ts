// https://test-utils.vuejs.org/api/#html
import { mount } from '@vue/test-utils'
import tile from './tile.vue'

describe("Tile component", () => {
    const wrapper = mount(tile);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has govflanders components', () => {
        expect(wrapper.find('vl-doormat').exists()).toBe(true)
    })

    it('Component has custom scss class', () => {
        expect(wrapper.find('vl-doormat').classes()).toContain('tile')
        expect(getComputedStyle(wrapper.find('vl-doormat').element).minHeight === '5rem')
        expect(getComputedStyle(wrapper.find('vl-doormat').element).height === '100%')
    })
})