<script>
import CodeEditor from '~/components/CodeEditor.vue';
import SlideSelector from '~/components/SlideSelector.vue';
import { formatFrame } from '~/libraries/dinamicFormat';

const defaultContent = {
  html: "<h1>Hello!</h1>",
  js: "console.log('Hello, World!')",
  css: "h1 {color: red}",
}

const defaultFrame = formatFrame(defaultContent);

let currentSlide = 0;


export default {
  components: {
    CodeEditor,
    SlideSelector
  },
  data() {
    return {
      "slideList": [{
        name: "New Slide",
        frameContent: defaultFrame,
        editorContent: structuredClone(defaultContent)
      }],
      "slideName": "New Slide",
      "frameContent": "",
      "editorContent": structuredClone(defaultContent),
    }
  },
  methods: {
    addNewSlide() {
      currentSlide = 0;

      this.slideList.push({
        name: this.slideName,
        editorContent: this.editorContent,
        frameContent: this.frameContent
      });

      this.frameContent = defaultFrame;
      this.editorContent = structuredClone(defaultContent);
    },
    selectedSlide(n) {
      this.slideList[currentSlide].name = this.slideName;
      this.slideList[currentSlide].editorContent = this.editorContent;
      this.slideList[currentSlide].frameContent = this.formatFrame;

      this.slideName = this.slideList[n].name;
      this.editorContent = this.slideList[n].editorContent;
      this.frameContent = this.slideList[n].frameContent;
      currentSlide = n;
    },
  }
}
</script>

<template>
  <SlideSelector :slide-list="slideList" @add-new-slide="addNewSlide" @selected-slide="selectedSlide" />
  <CodeEditor v-model:slide-name="slideName" v-model:frame-content="frameContent"
    v-model:editor-content="editorContent" />
</template>

<style scoped></style>
