<template>
  <div class="home">
    <!-- Search -->
    <div class="container search">
      <input @keyup.enter="searchShows" v-model.lazy="searchInput" type="text" placeholder="Search..">
      <button @click="clearSearch" v-show="searchInput !== ''" class="button">
        X
      </button>
    </div>

    <div class="loading" v-if="!isLoaded">
      <FadeLoader />
    </div>

    <!-- TV shows -->
    <div v-else class="container tv-shows">
      <div v-if="showSearchResults" class="row-header">
        <h1>Search result</h1>
        <SearchResults></SearchResults>
      </div>
      <div v-else>
        <div v-if="latestTVShows" class="row-header">
          <h1>New Releases</h1>
          <div class="wrapper">
            <div class="item" v-for="show in latestTVShows" :key="show.id">
              <TVShowCard :show="show" />
            </div>
          </div>
        </div>

        <div v-if="latestTVShows" class="row-header">
          <h1>Top Ratings</h1>
          <div class="wrapper">
            <div class="item" v-for="show in topTVShows" :key="show.id">
              <TVShowCard :show="show" />
            </div>
          </div>
        </div>

        <div v-for="(genre, index) in genres" :key="index">
          <TVShowsByGenres :genres="genre"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TVShowCard from './TVShowCard.vue'
import TVShowsByGenres from './TVShowsByGenres.vue'
import SearchResults from './SearchResults.vue'
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import { useHead } from '@vueuse/head'
import { GENRES } from '../shared/constants'

export default {
  components: { TVShowCard, SearchResults, FadeLoader, TVShowsByGenres },
  name: 'DashboardPage',

  setup () {
    const store = useStore()
    const searchInput = ref('')
    const isLoaded = ref(false)
    const showSearchResults = ref(false)
    const genres = GENRES
    const latestTVShows = computed(() => store.getters.newlyReleasedTVShows)
    const topTVShows = computed(() => store.getters.topRatingTVShows)

    /**
    * Search shows based on input value
    */
    const searchShows = () => {
      if (searchInput.value === '') {
        clearSearch()
        return
      }
      isLoaded.value = false
      store.dispatch('searchTVShows', searchInput.value)
        .then(() => {
          isLoaded.value = true
          showSearchResults.value = true
        })
    }

    /*
    * Clear search input field
    */
    const clearSearch = () => {
      searchInput.value = ''
      showSearchResults.value = false
    }

    /*
    * Load all TV shows on component load.
    */
    onMounted(() => {
      store.dispatch('loadTVShows').then(() => {
        isLoaded.value = true
      })
    })

    /*
    * Update head title
    */
    useHead({
      title: 'TV Shows - Dashboard',
      meta: [
        {
          name: 'description',
          content: 'My beautiful website.'
        }
      ]
    })

    return {
      searchInput,
      isLoaded,
      showSearchResults,
      genres,
      latestTVShows,
      topTVShows,
      searchShows,
      clearSearch
    }
  }
}
</script>

<style lang="scss">
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
    color: #fff;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      color: white;
      background-color: inherit;
      border-color: white;
      border:1px solid white;
      &:focus {
        outline: none;
        box-shadow: 0 0 15px #719ECE;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .tv-shows {
    padding: 32px 16px;
    .row-header {
      color: #fff;
      padding-bottom: 20px;
    }
  }
  .wrapper {
    display: flex;
    overflow-x: auto;
    .item {
      padding: 14px;
    }
  }
}
</style>
