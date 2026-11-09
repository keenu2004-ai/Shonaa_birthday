import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function mediaDiscoveryVitePlugin(): Plugin {
  return {
    name: 'vite-plugin-media-discovery',
    async buildStart() {
      try {
        const { writeManifest } = await import('./scripts/discover-media.mjs');
        writeManifest();
      } catch (err) {
        console.warn('[vite-plugin-media-discovery] Build start error:', err);
      }
    },
    configureServer(server) {
      const memoriesDir = path.resolve(__dirname, 'public/memories');
      const videosDir = path.resolve(__dirname, 'public/videos');
      const audioDir = path.resolve(__dirname, 'public/audio');

      server.watcher.add([memoriesDir, videosDir, audioDir]);

      server.watcher.on('all', async (event, filePath) => {
        if (
          filePath.includes('public/memories') ||
          filePath.includes('public\\memories') ||
          filePath.includes('public/videos') ||
          filePath.includes('public\\videos') ||
          filePath.includes('public/audio') ||
          filePath.includes('public\\audio')
        ) {
          try {
            const { writeManifest } = await import('./scripts/discover-media.mjs');
            writeManifest();
          } catch (e) {
            console.error('[vite-plugin-media-discovery] Watcher update error:', e);
          }
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mediaDiscoveryVitePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});

