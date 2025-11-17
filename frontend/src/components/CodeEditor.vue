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
  <div class="code-editor-layout">
    <!-- Left Panel: Code Editors -->
    <div class="editors-panel">
      <div class="settings-section">
        <div class="settings-grid">
          <div class="form-group">
            <label class="form-label">Slide Name</label>
            <input class="form-input" :value="slideName" @input="$emit('update:slideName', $event.target.value)"
              placeholder="Enter slide name..." />
          </div>

          <div class="form-group">
            <label class="form-label">Transition Time (seconds)</label>
            <input class="form-input" type="number" min="0" step="0.1" :value="transitionTime"
              @input="$emit('update:transitionTime', $event.target.value)" placeholder="1.5" />
          </div>

          <div class="form-group full-width">
            <label class="form-label">Expiration Date</label>
            <Calendar class="custom-calendar" :model-value="expirationDate"
              @update:model-value="$emit('update:expirationDate', $event)" show-time hour-format="24"
              placeholder="Select date and time..." />
          </div>
        </div>
      </div>

      <div class="code-sections">
        <div class="code-section">
          <CodeEditor max-height="30vh" width="100%" v-model="editorContent.html" :languages="[['HTML']]"
            class="code-editor-component" />
        </div>

        <div class="code-section">
          <CodeEditor max-height="30vh" width="100%" v-model="editorContent.js" :languages="[['JS']]"
            class="code-editor-component" />
        </div>

        <div class="code-section">
          <CodeEditor max-height="30vh" width="100%" v-model="editorContent.css" :languages="[['CSS']]"
            class="code-editor-component" />
        </div>
      </div>
    </div>

    <!-- Right Panel: Preview -->
    <div class="preview-panel">
      <div class="preview-header">
        <h3 class="preview-title">Preview</h3>
        <div class="preview-badge">Live</div>
      </div>
      <div class="preview-container">
        <iframe :srcdoc="frameContent" sandbox="allow-scripts" class="preview-frame"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-editor-layout {
  display: flex;
  height: 100vh;
  background: #0a0a0f;
}

/* Editors Panel */
.editors-panel {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #13131a;
  border-right: 1px solid #27272f;
}

.settings-section {
  padding: 24px;
  background: linear-gradient(135deg, #1a1a2e 0%, #13131a 100%);
  border-bottom: 1px solid #27272f;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #a1a1aa;
  letter-spacing: 0.01em;
}

.form-input {
  padding: 10px 14px;
  background: #1e1e2e;
  border: 1px solid #27272f;
  border-radius: 8px;
  color: #e4e4e7;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
}

.form-input:hover {
  border-color: #3b3b4f;
}

.form-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input::placeholder {
  color: #52525b;
}

/* Code Sections */
.code-sections {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.code-section {
  background: #1e1e2e;
  border: 1px solid #27272f;
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #1a1a2e 0%, #1e1e2e 100%);
  border-bottom: 1px solid #27272f;
}

.code-label {
  font-size: 13px;
  font-weight: 600;
  color: #a1a1aa;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-icon {
  font-size: 16px;
}

/* Preview Panel */
.preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0a0f;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: linear-gradient(135deg, #1a1a2e 0%, #13131a 100%);
  border-bottom: 1px solid #27272f;
}

.preview-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #e4e4e7;
  letter-spacing: -0.01em;
}

.preview-badge {
  padding: 4px 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.preview-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #a78bfa;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.preview-container {
  flex: 1;
  padding: 24px;
  overflow: hidden;
  display: flex;
  background:
    radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
    #0a0a0f;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: 1px solid #27272f;
  border-radius: 12px;
  background: white;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(99, 102, 241, 0.1);
}
</style>