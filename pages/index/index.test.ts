import { mount } from '@vue/test-utils'
import Page from "./index.vue"

describe("Index page", () => {
    const wrapper = mount(Page);
    test('Does the wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Page has a header', () => {
        expect(wrapper.find('content-header').exists()).toBe(true)
    })

    it('Page has a footer', () => {
        expect(wrapper.find('content-footer').exists()).toBe(true)
    })
})