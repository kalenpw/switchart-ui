import App from '@/App.vue';
import { mount } from '@vue/test-utils'

describe('App', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(App)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})