<script>
import CodeEditorComponent from "simple-code-editor";

export default {
    components: { CodeEditor: CodeEditorComponent },
    props: [
        "editorContent",
        "frameContent",
        "slideName"
    ],
    emits: ["update:editorContent", "update:frameContent", "update:slideName"],
    watch: {
        editorContent: {
            handler() {
                this.updateFrame();
            },
            deep: true
        }
    },
    methods: {
        formatFrame() {
            return `<!DOCTYPE html>
<html>
<head>
    <style>${this.editorContent.css}</style>
</head>
<body>
  ${this.editorContent.html}
  <script>${this.editorContent.js}${"<\/script>"}
</body>
</html>`;
        },
        updateFrame() {
            this.$emit("update:frameContent", this.formatFrame());
        }
    },
    mounted() {
        this.updateFrame();
    }
};
</script>

<template>
    <input :value="slideName" @input="$emit('update:slideName', $event.target.value)"></input>
    <CodeEditor v-model="editorContent.html" :languages="[['HTML']]" />
    <CodeEditor v-model="editorContent.js" :languages="[['JS']]" />
    <CodeEditor v-model="editorContent.css" :languages="[['CSS']]" />
    <iframe :srcdoc="frameContent" sandbox></iframe>
</template>
