<template>
  <div v-if="filteredShows.length > 0" class="row-header">
    <h1>{{ genres }}</h1>
    <div class="wrapper">
      <div class="item" v-for="show in filteredShows" :key="show.id">
        <TVShowCard :show="show" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import TVShowCard from './TVShowCard.vue'
import { useStore } from 'vuex'
export default {
  components: { TVShowCard },
  props: {
    genres: {
      type: String,
      required: false,
      default: 'all'
    }
  },

  setup (props) {
    const store = useStore()
    const filteredShows = computed(() => store.state.shows.filter(x => x.genres.includes(props.genres)))

    return {
      filteredShows
    }
  }
}
</script>
