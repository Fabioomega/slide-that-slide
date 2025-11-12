<script>
import CodeEditorComponent from "simple-code-editor";
import { formatFrame } from "~/libraries/dinamicFormat";

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
        updateFrame() {
            this.$emit("update:frameContent", formatFrame(this.editorContent));
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
    <iframe :srcdoc="frameContent" sandbox="allow-scripts"></iframe>
</template>
