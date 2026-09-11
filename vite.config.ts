import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Ensure any PDF placed in public/resume/ is also accessible as Swayam-Resume.pdf
function ensureResumePlugin() {
  return {
    name: 'ensure-resume-pdf',
    buildStart() {
      const publicResumeDir = path.resolve(__dirname, 'public/resume')
      if (fs.existsSync(publicResumeDir)) {
        const files = fs.readdirSync(publicResumeDir)
        const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'))
        const canonical = path.join(publicResumeDir, 'Swayam-Resume.pdf')
        if (!fs.existsSync(canonical) && pdfFiles.length > 0) {
          fs.copyFileSync(path.join(publicResumeDir, pdfFiles[0]), canonical)
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio-Website/',
  plugins: [react(), ensureResumePlugin()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
