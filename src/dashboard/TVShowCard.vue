<template>
  <div>
    <router-link :to="{ name: 'Details', params: { id: show.id } }">
      <div class="tv-show-img">
        <img :src="imagePath" alt="Image not available" />
        <p v-if="showRating" class="review">
          {{ show.rating.average }}
        </p>
      </div>
    </router-link>
    <div class="info">
      <p class="title">
        {{ show.name.slice(0, 25) }}
        <span v-if="show.name.length > 25">...</span>
      </p>
      <p class="release">Release: {{ premieredDate }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { dateFormatter } from '../shared/formatter'

export default {
  props: {
    show: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const imagePath = computed(() =>
      props.show.image && props.show.image.medium
        ? props.show.image.medium
        : require('../assets/image-not-found.jpeg')
    )
    const showRating = computed(
      () => props.show.rating && props.show.rating.average
    )
    const premieredDate = computed(() => dateFormatter(props.show.premiered))

    return {
      imagePath,
      showRating,
      premieredDate
    }
  }
}
</script>

<style lang="scss">
.tv-show-img {
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px 0 rgba(253, 252, 252, 0.2),
      0 6px 20px 0 rgba(204, 202, 202, 0.19);
  }

  .review {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #c92502;
    color: #fff;
    border-radius: 0 0 16px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

.info {
  margin-top: auto;

  .title {
    margin-top: 8px;
    color: #fff;
    font-size: 20px;
  }

  .release {
    margin-top: 8px;
    color: #c9c9c9;
  }

  .button {
    margin-top: 8px;
  }
}
</style>
