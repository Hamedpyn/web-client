import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@ckeditor/ckeditor5-build-classic'],
  },
  css: {
    preprocessorOptions: {
      css: {
        modules: false, // Disable CSS modules for compatibility with CKEditor
      },
    },
  },
})
