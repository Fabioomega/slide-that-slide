<script>
import hljs from "highlight.js";
import CodeEditorComponent from "simple-code-editor";
import DatePicker from "primevue/datepicker";
import { formatFrame } from "~/libraries/dinamicFormat";

let lastChecked = -1;
let isWaiting = false;

export default {
  components: { CodeEditor: CodeEditorComponent, Calendar: DatePicker },
  props: [
    "editorContent",
    "frameContent",
    "slideName",
    "expirationDate",
    "transitionTime",
  ],
  emits: [
    "update:editorContent",
    "update:frameContent",
    "update:slideName",
    "update:expirationDate",
    "update:transitionTime",
  ],
  watch: {
    editorContent: {
      handler() {
        this.updateFrame();
      },
      deep: true,
    },
  },
  methods: {
    batchedUpdateFrame() {
      if (Date.now() - lastChecked < 300) {
        isWaiting = true;
        setTimeout(this.batchedUpdateFrame, 100);
        return;
      }

      this.$emit("update:frameContent", formatFrame(this.editorContent));
      lastChecked = Date.now();
      isWaiting = false;
    },
    updateFrame() {
      if (isWaiting) return;

      this.batchedUpdateFrame();
    },
  },
  mounted() {
    this.updateFrame();
  },
};
</script>

<template>
  <div>
    <p>Name:</p>
    <input
      :value="slideName"
      @input="$emit('update:slideName', $event.target.value)"
    />
  </div>

  <div>
    <p>Transition Time (seconds):</p>
    <input
      type="number"
      min="0"
      step="0.1"
      :value="transitionTime"
      @input="$emit('update:transitionTime', $event.target.value)"
    />
  </div>

  <div>
    <p>Expiration Date:</p>
    <Calendar
      :model-value="expirationDate"
      @update:model-value="$emit('update:expirationDate', $event)"
      show-time
      hour-format="24"
    />
  </div>
  <CodeEditor v-model="editorContent.html" :languages="[['HTML']]" />
  <CodeEditor v-model="editorContent.js" :languages="[['JS']]" />
  <CodeEditor v-model="editorContent.css" :languages="[['CSS']]" />
  <iframe :srcdoc="frameContent" sandbox="allow-scripts"></iframe>
</template>
