import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Animation and UI libraries
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui')) {
              return 'ui-components';
            }
            // 3D and graphics
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // Charts and data visualization
            if (id.includes('recharts') || id.includes('d3')) {
              return 'charts';
            }
            // Particles and effects
            if (id.includes('tsparticles') || id.includes('particles')) {
              return 'particles';
            }
            // Simple icons (large bundle)
            if (id.includes('simple-icons')) {
              return 'icons';
            }
            // Lottie animations
            if (id.includes('lottie')) {
              return 'lottie';
            }
            // Other vendor packages
            return 'vendor';
          }
        },
        chunkFileNames: `assets/[name]-[hash].js`
      },
    },
    reportCompressedSize: true,
    cssMinify: true,
    chunkSizeWarningLimit: 800, // More strict limit
    target: 'es2015', // Better compatibility and smaller bundles
    sourcemap: false, // Disable sourcemaps in production for smaller builds
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['simple-icons'], // Don't pre-bundle large icon libraries
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
