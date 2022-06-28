import { mount, RouterLinkStub } from "@vue/test-utils"
import { createStore } from 'vuex'
import SearchResults from '@/dashboard/SearchResults.vue'
import { show } from "./mocks/generator"

describe('SearchResults', () => {
  describe('Given search string to search result component', () => {
    describe('When component is loaded', () => {
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

      it('Then we expect html should contains name in the title', () => {
        expect(wrapper.html()).toContain(show.name)
      })
    })
  })
})