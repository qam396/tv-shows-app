import { mount, RouterLinkStub } from "@vue/test-utils"
import { createStore } from 'vuex'
import TVShowsByGenres from '@/dashboard/TVShowsByGenres.vue'
import { show } from "./mocks/generator"

describe('TVShowsByGenres', () => {
  describe('Given tv show by genres component initial values', () => {
    describe('When component is mounted', () => {
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

      it('Then we expect genres in the title', () => {
        expect(wrapper.html()).toContain(genre)
      })

      it('Then we expect to have one tv-show in the store', () => {
        expect(wrapper.vm.filteredShows.length).toBe(1)
        expect(wrapper.vm.genres).toEqual(genre)
      })
    })
  })
})
