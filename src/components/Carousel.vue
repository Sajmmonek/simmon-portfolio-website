<template>
  <Carousel :items-to-show="itemsToShow" :wrap-around="true" :autoplay="1500" class="w-11/12 xl:w-1/2 mx-auto">
    <Slide v-for="event in events" :key="event.name">
      <div class="carousel__item flex flex-col ml-4">
        <img class="w-7 h-7 mb-2" :src="require(`../assets/svg/${event.icon}.svg`)" alt="">
        {{ $t(`about-me.${event.name}`) }}
      </div>
    </Slide>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Autoplay',
  data() {
    return {
      windowWidth: window.innerWidth,
      itemsToShow: 1,
      events: [
        { name: "photo-sessions", icon: "camera"},
        { name: "festivals", icon: "microphone"},
        { name: "automotive-events", icon: "car"},
        { name: "celebrations", icon: "cake"},
        { name: "sporting-events", icon: "sport"},
      ]
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  created() {
    console.log(this.windowWidth)
    if(this.windowWidth > 900) {
      this.itemsToShow = 3
    }
    else {
      this.itemsToShow = 1
    }

  },
});
</script>