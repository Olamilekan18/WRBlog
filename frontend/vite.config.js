import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   define: {
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify('http://localhost:5000')
  }
})
