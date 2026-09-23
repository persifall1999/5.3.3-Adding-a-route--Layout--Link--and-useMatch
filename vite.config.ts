/// <reference types="vitest" /> 
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/5.3.3-Adding-a-route-Layout-Link-and-useMatch/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
