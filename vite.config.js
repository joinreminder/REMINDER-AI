import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Gzip para compatibilidade máxima
    compression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
    // Brotli — melhor compressão, suportado por todos os CDNs modernos
    compression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },

  // Drop console.log em produção (esbuild, incluído no Vite)
  esbuild: {
    drop: ['console', 'debugger'],
  },

  build: {
    // CSS separado por chunk (crítico para performance)
    cssCodeSplit: true,

    // Reportar apenas acima de 800kb (chunks lazy são menores)
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Chunks manuais para o que é carregado na homepage
        manualChunks(id) {
          // React core — sempre necessário
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react'
          }
          // Router — carregado cedo mas separado
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router')) {
            return 'router'
          }
          // GSAP — grande, só usado para animações
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          // Lenis — scroll suave, só na homepage
          if (id.includes('node_modules/lenis')) {
            return 'lenis'
          }
          // Supabase — só na página de roadmap (lazy)
          if (id.includes('node_modules/@supabase')) {
            return 'supabase'
          }
        },
        // Nomes de ficheiros com hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
