<script>
import { formatFrame } from "~/libraries/dinamicFormat";

export default {
  props: ["slideList"],
  emits: ["addNewSlide", "selectedSlide"],
  computed: {
    slides() {
      return this.slideList.map((slide) => {
        return {
          name: slide.name,
          content: formatFrame(slide.editorContent),
        };
      });
    },
  },
};
</script>

<template>
  <div id="slides-preview-list">
    <div
      v-for="(slide, idx) in this.slides.reverse()"
      :key="idx"
      @click="$emit('selectedSlide', this.slides.length - idx - 1)"
    >
      <iframe
        :srcdoc="slide.content"
        class="slides-preview"
        sandbox=""
      ></iframe>
      <label>{{ slide.name }}</label>
    </div>
  </div>
  <button @click="$emit('addNewSlide')">Add new slide</button>
</template>

<style scoped>
.slides-preview {
  width: 150px;
  height: 100px;
  border: 1px solid #aaa;
  transform: scale(0.25);
  transform-origin: top left;
  pointer-events: none;
  overflow: hidden;
  background: white;
}
</style>
