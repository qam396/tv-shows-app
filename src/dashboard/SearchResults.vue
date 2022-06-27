<template>
    <div v-if="searchedResult" id="show-grid" class="tv-shows-grid">
      <div class="tv-show" v-for="show in searchedResult" :key="show.id">
        <TVShowCard :show="show" />
      </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import TVShowCard from './TVShowCard.vue'

export default {
  components: { TVShowCard },

  setup () {
    const store = useStore()
    const searchedResult = computed(() => store.state.searchedShows)

    return {
      searchedResult
    }
  }
}
</script>

<style lang="scss" scoped>
  .tv-shows-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(6, 1fr);
      }
    }
</style>
