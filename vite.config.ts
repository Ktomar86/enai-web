import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-framework': ['framer-motion', 'lucide-react'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'charts': ['recharts'],
          'particles': ['@tsparticles/engine', '@tsparticles/react', '@tsparticles/slim']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
