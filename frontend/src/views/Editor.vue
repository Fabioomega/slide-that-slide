<script>
import { customRef } from "vue";
import CodeEditor from "~/components/CodeEditor.vue";
import SlideSelector from "~/components/SlideSelector.vue";
import { formatFrame } from "~/libraries/dinamicFormat";

const defaultContent = {
  html: "<h1>Hello!</h1>",
  js: "console.log('Hello, World!')",
  css: "h1 {color: red}",
};

const defaultFrame = formatFrame(defaultContent);
const defaultTransitionTime = 1.5;
const defaultSlideName = "Cool Slide";

let currentSlide = 0;

export default {
  components: {
    CodeEditor,
    SlideSelector,
  },
  data() {
    return {
      slideList: [
        {
          name: defaultSlideName,
          frameContent: defaultFrame,
          editorContent: structuredClone(defaultContent),
        },
      ],
      slideName: defaultSlideName,
      expirationDate: null,
      transitionTime: defaultTransitionTime,
      frameContent: "",
      editorContent: structuredClone(defaultContent),
    };
  },
  methods: {
    addNewSlide() {
      currentSlide = 0;

      this.slideList.push({
        name: this.slideName,
        editorContent: this.editorContent,
        transitionTime: this.transitionTime,
        expirationDate: this.expirationDate,
      });

      this.frameContent = defaultFrame;
      this.editorContent = structuredClone(defaultContent);
      this.transitionTime = defaultTransitionTime;
      this.expirationDate = null;
    },
    selectedSlide(n) {
      this.slideList[currentSlide].name = this.slideName;
      this.slideList[currentSlide].editorContent = this.editorContent;
      this.slideList[currentSlide].transitionTime = this.transitionTime;
      this.slideList[currentSlide].expirationDate = this.expirationDate;

      this.slideName = this.slideList[n].name;
      this.expirationDate = this.slideList[n].expirationDate;
      this.transitionTime = this.slideList[n].transitionTime;
      this.editorContent = this.slideList[n].editorContent;
      this.frameContent = formatFrame(this.slideList[n].editorContent);
      currentSlide = n;
    },
  },
};
</script>

<template>
  <SlideSelector
    :slide-list="slideList"
    @add-new-slide="addNewSlide"
    @selected-slide="selectedSlide"
  />
  <CodeEditor
    v-model:slide-name="slideName"
    v-model:frame-content="frameContent"
    v-model:editor-content="editorContent"
    v-model:expiration-date="expirationDate"
    v-model:transition-time="transitionTime"
  />
</template>

<style scoped></style>
