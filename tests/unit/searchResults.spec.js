import { mount, RouterLinkStub } from "@vue/test-utils"
import { createStore } from 'vuex'
import SearchResults from '@/dashboard/SearchResults.vue'
import { show } from "./mocks/generator"

describe('Given search string', () => {
  describe('When component is loaded', () => {
    describe('Then template should have filtered result', () => {

      let wrapper = {}

      beforeEach(() => {
        const store = createStore({
          state() {
            return {
              searchedShows: [show]
            }
          }
        })

        wrapper = mount(SearchResults, {
          global: {
            plugins: [store],
            stubs: {
              RouterLink: RouterLinkStub
            }
          }
        })        
      })

      it('Should contains name in the title', () => {
        expect(wrapper.html()).toContain(show.name)
      })
    })
  })
})