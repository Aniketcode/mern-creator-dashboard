import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],
  base : "./",
  server : {
    proxy : {
      '/api' :{
        target : 'https://mern-creator-dashboard-backend.onrender.com',
        changeOrigin : true,
        secure:true
      }
    }
  }
})
