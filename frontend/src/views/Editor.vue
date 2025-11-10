<script>
import CodeEditor from '~/components/CodeEditor.vue';
import SlideSelector from '~/components/SlideSelector.vue';

const formatFrame = (content, zoomOut = false) => {
  const html = content.html;
  const js = content.js;
  const css = content.css;

  let zoom = `<style>body {
      transform: scale(0.25);
      transform-origin: top left;
      width: 400%;
      height: 400%;
    }</style>`;

  return `<!DOCTYPE html>
<html>
<head>
    ${(zoomOut ? zoom : "")}
    <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}${"<\/script>"}
</body>
</html>`
}

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
        editorContent: defaultContent
      }],
      "slideName": "New Slide",
      "frameContent": "",
      "editorContent": defaultContent,
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
      this.editorContent = defaultContent;
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
