import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(MyComponent)
        expect(wrapper.isVueInstance()).toBeTruthy();
    })
})