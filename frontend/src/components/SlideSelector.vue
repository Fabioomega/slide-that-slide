<script>
export default {
    props: ["slideList"],
    emits: ["addNewSlide", "selectedSlide"]
}
</script>

<template>
    <div id="slides-preview-list">
        <div v-for="(slide, idx) in [...slideList].reverse()" :key="idx"
            @click="$emit('selectedSlide', slideList.length - idx - 1)">
            <iframe :srcdoc="slide.frameContent" class="slides-preview" sandbox=""></iframe>
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
