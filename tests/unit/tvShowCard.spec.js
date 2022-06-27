import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils'
import TVShowCard from '@/dashboard/TVShowCard.vue'

describe('Given props value to the component', () => {
  describe('When component is loaded', () => {
    describe('Then props value should be in the template', () => {

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

      it('Check prop values in the template', () => {
        console.log(wrapper.html())
        expect(wrapper.html()).toContain('best show')
        expect(wrapper.html()).toContain('Image not available')
      })

      it('Check computed values in the component', () => {
        console.log(wrapper.getComponent(TVShowCard).vm)
        expect(wrapper.getComponent(TVShowCard).vm.imagePath).toEqual('imagePath')
        expect(wrapper.getComponent(TVShowCard).vm.showRating).toEqual('6.4')
      })
    })
  })
})
