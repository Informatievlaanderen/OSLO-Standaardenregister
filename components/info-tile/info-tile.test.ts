import { mount } from '@vue/test-utils'
import infoTile from './info-tile.vue'

describe("infoTile component", () => {
    const wrapper = mount(infoTile);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Component has a govflanders components', () => {
        expect(wrapper.find('vl-info-tile').exists()).toBe(true)
        expect(wrapper.find('vl-info-tile').attributes('tag-name')).toContain('div')
    })
})