import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith("ion-icon") ||
            (tag.startsWith("Tres") && tag !== "TresCanvas") ||
            tag === "primitive",
        },
      },
    }),
    AutoImport({
      dirs: [],
      imports: ["vue"],
    }),
    Components({
      dirs: ["src/components"],
    }),
  ],
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
