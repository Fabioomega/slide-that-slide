<script>
import { formatFrame } from "~/libraries/dinamicFormat";

export default {
  props: ["slideList", "currentSlide"],
  emits: ["addNewSlide", "removeSlide", "selectSlide"],
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
  <div class="slide-selector-container">
    <div id="slides-preview-list">
      <div v-for="(slide, idx) in this.slides" :key="idx" class="slide-item"
        :class="{ 'slide-active': currentSlide === idx }">

        <button class="delete-slide-btn" @click="$emit('removeSlide', idx)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <div class="slide-preview-wrapper" @click="$emit('selectSlide', idx)">
          <iframe :srcdoc="slide.content" class="slides-preview" sandbox=""></iframe>
          <div class="slide-overlay">
            <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        </div>
        <div class="slide-info">
          <label class="slide-label">{{ slide.name }}</label>
          <span class="slide-number">Slide {{ idx + 1 }}</span>
        </div>
        <div v-if="currentSlide === idx" class="active-indicator"></div>
      </div>
    </div>

    <div class="add-slide-section">
      <button @click="$emit('addNewSlide')" class="add-slide-btn">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        Add New Slide
      </button>
    </div>
  </div>
</template>

<style scoped>
.slide-selector-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#slides-preview-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slide-item {
  position: relative;
  background: #1e1e2e;
  border: 2px solid #27272f;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-item:hover {
  border-color: #3b3b4f;
  background: #222232;
  transform: translateX(4px);
}

.delete-slide-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 30, 46, 0.8);
  border: 1px solid #3f3f46;
  border-radius: 6px;
  color: #71717a;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.slide-item:hover .delete-slide-btn {
  opacity: 1;
  transform: translateY(0);
}

.delete-slide-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
  transform: scale(1.05);
}

.slide-item.slide-active {
  border-color: #6366f1;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  box-shadow:
    0 0 0 1px rgba(99, 102, 241, 0.2),
    0 8px 20px rgba(99, 102, 241, 0.15);
}

.slide-item.slide-active:hover {
  transform: translateX(6px);
  box-shadow:
    0 0 0 1px rgba(99, 102, 241, 0.3),
    0 12px 28px rgba(99, 102, 241, 0.2);
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 0 4px 4px 0;
}

.slide-preview-wrapper {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  background: #13131a;
  margin-bottom: 10px;
  border: 1px solid #27272f;
}

.slides-preview {
  width: 1000px;
  height: 400px;
  border: none;
  transform: scale(0.25);
  transform-origin: top left;
  pointer-events: none;
  background: white;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.slide-item:hover .slide-overlay {
  opacity: 1;
}

.play-icon {
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.slide-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slide-label {
  font-size: 13px;
  font-weight: 500;
  color: #e4e4e7;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slide-active .slide-label {
  color: #a78bfa;
  font-weight: 600;
}

.slide-number {
  font-size: 11px;
  color: #71717a;
  font-weight: 500;
}

.slide-active .slide-number {
  color: #8b5cf6;
}

/* Add Slide Section */
.add-slide-section {
  padding: 16px 12px;
  border-top: 1px solid #27272f;
  background: linear-gradient(180deg, transparent 0%, #13131a 100%);
}

.add-slide-btn {
  width: 100%;
  padding: 12px 16px;
  background: #1e1e2e;
  color: #a1a1aa;
  border: 2px dashed #27272f;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-slide-btn:hover {
  background: #222232;
  border-color: #6366f1;
  color: #a78bfa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.add-slide-btn:active {
  transform: translateY(0);
}

.add-slide-btn svg {
  transition: transform 0.3s ease;
}

.add-slide-btn:hover svg {
  transform: rotate(90deg);
}

/* Scrollbar */
#slides-preview-list::-webkit-scrollbar {
  width: 6px;
}

#slides-preview-list::-webkit-scrollbar-track {
  background: transparent;
}

#slides-preview-list::-webkit-scrollbar-thumb {
  background: #27272f;
  border-radius: 3px;
}

#slides-preview-list::-webkit-scrollbar-thumb:hover {
  background: #3b3b4f;
}
</style>