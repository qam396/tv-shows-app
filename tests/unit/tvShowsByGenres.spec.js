import { mount, RouterLinkStub } from "@vue/test-utils"
import { createStore } from 'vuex'
import TVShowsByGenres from '@/dashboard/TVShowsByGenres.vue'
import { show } from "./mocks/generator"

describe('Given genres values to the component', () => {
  describe('When component is loaded', () => {
    describe('Then template should have genres as title', () => {

      let wrapper = {}
      const genre = 'Action'

      beforeEach(() => {
        const store = createStore({
          state() {
            return {
              shows: [show]
            }
          }
        })

        wrapper = mount(TVShowsByGenres, {
          props: {
            genres: genre
          },
          global: {
            plugins: [store],
            stubs: {
              RouterLink: RouterLinkStub
            }
          }
        })        
      })

      it('Should contains genres as Action in the title', () => {
        expect(wrapper.html()).toContain(genre)
      })

      it('should have one show in the store', () => {
        expect(wrapper.vm.filteredShows.length).toBe(1)
        expect(wrapper.vm.genres).toEqual(genre)
      })
    })
  })
})