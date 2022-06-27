<template>
  <div class="loading" v-if="!isLoaded">
    <FadeLoader/>
  </div>
  <div v-else class="container single-show">
    <router-link class="button" :to="{ name: 'Dashboard'}">Back</router-link>
    <div class="show-info">
      <div class="show-img">
        <img :src="show.image !== null ? show.image.original : '' " alt="">
      </div>
      <div class="show-content">
        <h1>Title: {{ show.name }}</h1>
        <p class="show-fact tagline">
          <span>Genres:</span> {{ show.genres.toString() }}
        </p>
        <p class="show-fact">
          <span>Released:</span>
          {{ show.premiered }}
        </p>
        <p class="show-fact">
          <span>Duration:</span> {{ show.runtime }} minutes
        </p>
        <p class="show-fact">
          <span>average runtime:</span>
          {{ show.averageRuntime }}
        </p>
        <div class="show-fact">
          <span>Overview:</span>
          <p v-html="show.summary"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const isLoaded = ref(false)
    const show = computed(() => store.getters.selectedTVShow)

    /*
    * Get single TV show based on id
    */
    const getTVShowById = async () => {
      store.dispatch('getTVShowDetails', route.params.id)
        .then(() => {
          isLoaded.value = true
        })
    }

    /*
    * Get single TV show by id on page load
    */
    onMounted(() => {
      getTVShowById()
    })

    /*
    * Set head title
    */
    useHead({
      title: 'TV Shows - Details',
      meta: [
        {
          name: 'tv show description',
          content: 'My beautiful website.'
        }
      ]
    })

    return {
      isLoaded,
      show
    }
  }
}
</script>

<style lang="scss">
.single-show {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .show-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .show-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .show-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .show-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
