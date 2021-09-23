<template>
  <Carousel :items-to-show="3" :wrap-around="true" :autoplay="1500" class="w-1/2 mx-auto">
    <Slide v-for="event in events" :key="event.name">
      <div class="carousel__item flex flex-col">
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
      events: [
        { name: "photo-sessions", icon: "camera"},
        { name: "festivals", icon: "microphone"},
        { name: "celebrations", icon: "cake"},
        { name: "sporting-events", icon: "sport"},
        { name: "automotive-events", icon: "car"},
      ]
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
  },
});
</script>