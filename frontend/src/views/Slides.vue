<script>
import { formatFrame } from "~/libraries/dinamicFormat";

let currentTimer = -1;

export default {
  data() {
    return {
      frameContent: "",
      slides: [],
    };
  },
  watch: {
    slides(newSlides, oldSlides) {
      if (currentTimer !== -1) clearTimeout(currentTimer);
      this.renderSlide(0);
    }
  },
  methods: {
    renderSlide(idx) {
      if (idx >= this.slides.length) {
        if (this.slides.length === 0) return;

        this.renderSlide(0);
        return;
      }

      let slide = this.slides[idx];

      if (
        (slide.expirationDate !== null &&
          Data.now() > new Date(slide.expirationDate)) ||
        slide.transitionTime <= 0
      ) {
        this.renderSlide(idx + 1);
        return;
      }

      this.frameContent = formatFrame(slide.editorContent);
      currentTimer = setTimeout(() => this.renderSlide(idx + 1), slide.transitionTime * 1000);
    },
  }
}
</script>

<template>
  <iframe :srcdoc="frameContent" sandbox=""></iframe>
</template>

<style scoped></style>
