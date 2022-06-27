import { API_BASE_URL } from '@/shared/constants'
import { dateFormatter } from '@/shared/formatter'
import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    shows: [],
    searchedShows: [],
    selectedShow: {}
  },
  mutations: {
    updateTVShows (state, shows) {
      state.shows = shows
    },
    updateSearchedTVShows (state, show) {
      state.searchedShows.push(show)
    },
    updateSelectedTVShow (state, show) {
      console.log(show)
      show.premiered = dateFormatter(show.premiered)
      state.selectedShow = show
    }
  },
  actions: {
    loadTVShows ({ commit }) {
      this.shows = []
      return axios.get(`${API_BASE_URL}/shows`)
        .then((result) => commit('updateTVShows', result.data))
        .catch(console.error)
    },
    searchTVShows ({ commit, state }, searchString) {
      state.searchedShows = []
      return axios.get(`${API_BASE_URL}/search/shows?q=${searchString}`)
        .then((result) => {
          result.data.forEach(result => {
            commit('updateSearchedTVShows', result.show)
          })
        })
        .catch(console.error)
    },
    getTVShowDetails ({ commit }, id) {
      return axios.get(`${API_BASE_URL}/shows/${id}`)
        .then((result) => {
          commit('updateSelectedTVShow', result.data)
        })
        .catch(console.error)
    }
  },
  getters: {
    newlyReleasedTVShows (state) {
      return state.shows.sort((a, b) => new Date(b.premiered) - new Date(a.premiered)).slice(0, 20)
    },
    topRatingTVShows (state) {
      return state.shows.slice().sort((a, b) => a.rating.average - b.rating.average ?? 0).slice(0, 20)
    },
    selectedTVShow (state) {
      return state.selectedShow
    }
  }
})
