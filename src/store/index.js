import { API_BASE_URL } from '@/shared/constants'
import { dateFormatter } from '@/shared/formatter'
import axios from 'axios'
import moment from 'moment'
import { createStore } from 'vuex'

export default createStore({
  state: {
    shows: [],
    searchedShows: [],
    selectedShow: {},
    selectedShowCast: [],
    topRatinShows: []
  },
  mutations: {
    updateTVShows (state, shows) {
      state.shows = shows
      state.topRatinShows = shows.sort((a, b) => ((b.rating.average ?? 0) - (a.rating.average ?? 0))).slice(0, 20)
    },
    updateSearchedTVShows (state, show) {
      state.searchedShows.push(show)
    },
    updateSelectedTVShow (state, show) {
      show.premiered = dateFormatter(show.premiered)
      state.selectedShow = show
    },
    updateSelectedTVShowCast (state, cast) {
      state.selectedShowCast.push(cast)
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
    getTVShowDetails ({ commit, state }, id) {
      state.selectedShowCast = []
      return axios.get(`${API_BASE_URL}/shows/${id}`)
        .then((result) => {
          commit('updateSelectedTVShow', result.data)
          axios.get(`${API_BASE_URL}/shows/${id}/cast`)
            .then((result) => {
              result.data.forEach(cast => {
                commit('updateSelectedTVShowCast', cast.person)
              })
            })
        })
        .catch(console.error)
    }
  },
  getters: {
    newlyReleasedTVShows (state) {
      return state.shows.sort((a, b) => moment(b.premiered) - moment(a.premiered)).slice(0, 20)
    },
    topRatingTVShows (state) {
      return state.topRatinShows
    },
    selectedTVShow (state) {
      return state.selectedShow
    },
    selectedTVShowCast (state) {
      return state.selectedShowCast
    }
  }
})
