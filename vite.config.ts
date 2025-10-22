import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    dedupe: ['react', 'react-dom', 'jotai'],
  },
  optimizeDeps: {
    include: ['jotai'],
    exclude: [],
  },
  build: {
    // Production optimizations
    target: 'es2020', // ES2020 required for BigInt support (Solana libraries)
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-avatar',
          ],
          'solana-vendor': [
            '@solana/web3.js',
            '@solana/wallet-adapter-base',
            '@solana/wallet-adapter-react',
            '@solana/wallet-adapter-react-ui',
            '@solana/wallet-adapter-wallets',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: [
      '.replit.dev',
      '.repl.co',
      'localhost',
    ],
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5000,
    },
    watch: {
      ignored: ['**/node_modules/**', '**/.local/**', '**/pnpm-store/**']
    }
  },
  preview: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: [
      '.replit.dev',
      '.repl.co',
      'localhost',
    ],
  },
});
