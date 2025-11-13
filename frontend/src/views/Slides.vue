<script>
import { formatFrame } from "~/libraries/dinamicFormat";

export default {
  data() {
    return {
      frameContent: "",
      slides: [],
    };
  },
  methods: {
    rendering() {
      let time_acc = 0;

      for (const slide of this.slides) {
        if (
          (slide.expirationDate !== null &&
            Data.now() > new Date(slide.expirationDate)) ||
          slide.transitionTime === -1
        ) {
          continue;
        }

        time_acc += slide.transitionTime / 1000;

        setTimeout(() => {
          this.frameContent = formatFrame(slide.editorContent);
        }, time_acc);
      }

      setTimeout(() => this.rendering(), time_acc);
    },
  },
  mounted() {
    this.loadSlides();
  },
};
</script>

<template>
  <iframe :srcdoc="frameContent" sandbox=""></iframe>
</template>

<style scoped></style>
