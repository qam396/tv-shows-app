import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils'
import TVShowCard from '@/dashboard/TVShowCard.vue'

describe('TVShowCard', () => {
  describe('Given tv show card component with filled show prop', () => {
    describe('When the component is mounted', () => {
      let wrapper = {}

      beforeEach(() => {
        wrapper = mount(TVShowCard, {
          props: {
            show: {
              name: 'best show',
              image: {
                medium: 'imagePath'
              },
              rating: {
                average: '6.4'
              },
              premiered: '24-07-2014'
            }   
          },
          global: {
            stubs: {
              RouterLink: RouterLinkStub
            }
          }
        })
      })

      it('Then we expect show details to be on html', () => {
        expect(wrapper.html()).toContain('best show')
        expect(wrapper.html()).toContain('Image not available')
      })

      it('Then we expect the variables to be set in the component', () => {
        expect(wrapper.getComponent(TVShowCard).vm.imagePath).toEqual('imagePath')
        expect(wrapper.getComponent(TVShowCard).vm.showRating).toEqual('6.4')
      })
    })
  })
})
