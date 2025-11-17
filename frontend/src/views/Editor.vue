<script>
import { Toast } from "primevue";
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

let shouldSave = false;

export default {
  components: {
    CodeEditor,
    SlideSelector,
    Toast,
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
      currentSlideIndex: 0,
    };
  },
  watch: {
    slideList: {
      handler() {
        shouldSave = true;
      },
      deep: true,
    },
  },
  methods: {
    addNewSlide() {
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
      this.currentSlideIndex = this.slideList.length - 1;
    },
    selectedSlide(n) {
      this.slideList[this.currentSlideIndex].name = this.slideName;
      this.slideList[this.currentSlideIndex].editorContent = this.editorContent;
      this.slideList[this.currentSlideIndex].transitionTime = this.transitionTime;
      this.slideList[this.currentSlideIndex].expirationDate = this.expirationDate;

      this.slideName = this.slideList[n].name;
      this.expirationDate = this.slideList[n].expirationDate;
      this.transitionTime = this.slideList[n].transitionTime;
      this.editorContent = this.slideList[n].editorContent;
      this.frameContent = formatFrame(this.slideList[n].editorContent);

      this.currentSlideIndex = n;
    },
    notifySave() {
      this.$toast.add({ severity: 'info', summary: "The project was saved successfully", life: 2000 })
    },
    saveSlides() {
      this.notifySave()
    },
    monitorSlides() {
      if (shouldSave) {
        this.saveSlides()
        shouldSave = false;
      }
    }
  },
  mounted() {
    setInterval(this.monitorSlides, 5000)
  }
};
</script>

<template>
  <Toast />
  <div class="editor-container">
    <!-- Left Sidebar: Slide Selector -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Slides</h2>
        <button class="save-btn" @click="saveSlides">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12.5 2H3.5C2.67 2 2 2.67 2 3.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zm-1 10h-7v-7h7v7zm-1-9h-4V2h4v1z"
              fill="currentColor" />
          </svg>
          Save
        </button>
      </div>
      <SlideSelector :slide-list="slideList" :current-slide="currentSlideIndex" @add-new-slide="addNewSlide"
        @selected-slide="selectedSlide" />
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <CodeEditor v-model:slide-name="slideName" v-model:frame-content="frameContent"
        v-model:editor-content="editorContent" v-model:expiration-date="expirationDate"
        v-model:transition-time="transitionTime" />
    </main>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
  height: 100vh;
  background: #0a0a0f;
  color: #e4e4e7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: #13131a;
  border-right: 1px solid #27272f;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #27272f;
  background: linear-gradient(135deg, #1a1a2e 0%, #13131a 100%);
}

.sidebar-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #e4e4e7;
  letter-spacing: -0.02em;
}

.save-btn {
  width: 100%;
  padding: 10px 16px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.save-btn:active {
  transform: translateY(0);
}

/* Main Content */
.main-content {
  flex: 1;
  overflow: hidden;
}
</style>