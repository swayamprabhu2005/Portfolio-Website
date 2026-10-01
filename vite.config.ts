import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Ensure legacy links to Swayam-Resume.pdf remain accessible in the built dist bundle
function ensureResumePlugin() {
  return {
    name: 'ensure-resume-pdf',
    closeBundle() {
      const distResumeDir = path.resolve(__dirname, 'dist/resume')
      if (fs.existsSync(distResumeDir)) {
        const files = fs.readdirSync(distResumeDir)
        const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf') && f !== 'Swayam-Resume.pdf')
        const canonical = path.join(distResumeDir, 'Swayam-Resume.pdf')
        if (!fs.existsSync(canonical) && pdfFiles.length > 0) {
          fs.copyFileSync(path.join(distResumeDir, pdfFiles[0]), canonical)
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
