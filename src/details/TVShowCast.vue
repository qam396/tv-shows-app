<template>
  <div class="row">
    <div v-for="cast in casts" :key="cast.id" class="column">
      <img :src="cast.image.medium" alt="Image not available" class="img" />
      <p>
        {{ cast.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const casts = computed(() => store.getters.selectedTVShowCast)

    return {
      casts
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
      grid-template-columns: repeat(1, 1fr);
    }
    @media (min-width: 750px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
.wrapper {
  display: flex;
  overflow-x: auto;
  .item {
    padding: 14px;
  }

  /* Remove extra left and right margins, due to padding */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
}
/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
  img {
    @media only screen and (min-width: 500px) {
      height: 100px;
    }
    @media (min-width: 750px) {
      height: 150px;
    }
    @media (min-width: 1100px) {
      height: 200px;
    }
  }
}
</style>
