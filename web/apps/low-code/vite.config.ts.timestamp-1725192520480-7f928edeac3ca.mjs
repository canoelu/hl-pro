// vite.config.ts
import process3 from "node:process";
import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/vite@5.3.3_@types+node@20.12.10_sass@1.76.0/node_modules/vite/dist/node/index.js";
import dayjs from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/dayjs@1.11.11/node_modules/dayjs/dayjs.min.js";

// ../../config/plugins/index.ts
import vue from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_vue@3.4.26/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11_vue@3.4.26/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import progress from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/vite-plugin-progress@0.0.7_vite@5.2.11/node_modules/vite-plugin-progress/dist/index.mjs";

// ../../config/plugins/unocss.ts
import process from "node:process";
import path from "node:path";
import unocss from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/@unocss+vite@0.59.4_vite@5.2.11/node_modules/@unocss/vite/dist/index.mjs";
import presetIcons from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/@unocss+preset-icons@0.59.4/node_modules/@unocss/preset-icons/dist/index.mjs";
import { FileSystemIconLoader } from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/@iconify+utils@2.1.25/node_modules/@iconify/utils/lib/loader/node-loaders.mjs";
function setupUnocss(viteEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const localIconPath = path.join(process.cwd(), "src/assets/svg-icon");
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");
  return unocss({
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: "inline-block"
        },
        collections: {
          [collectionName]: FileSystemIconLoader(
            localIconPath,
            (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
          )
        },
        warn: true
      })
    ]
  });
}

// ../../config/plugins/unplugin.ts
import process2 from "node:process";
import path2 from "node:path";
import Icons from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/unplugin-icons@0.19.0_@vue+compiler-sfc@3.4.31/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/unplugin-icons@0.19.0_@vue+compiler-sfc@3.4.31/node_modules/unplugin-icons/dist/resolver.js";
import Components from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/unplugin-vue-components@0.27.2_vue@3.4.31/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver, NaiveUiResolver } from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/unplugin-vue-components@0.27.2_vue@3.4.31/node_modules/unplugin-vue-components/dist/resolvers.js";
import { FileSystemIconLoader as FileSystemIconLoader2 } from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/unplugin-icons@0.19.0_@vue+compiler-sfc@3.4.31/node_modules/unplugin-icons/dist/loaders.js";
import { createSvgIconsPlugin } from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import viteCompression from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.3.4/node_modules/vite-plugin-compression/dist/index.mjs";
import AutoImport from "file:///D:/canoe/code/hl-pro/web/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
function setupUnplugin(viteEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const localIconPath = path2.join(process2.cwd(), "src/assets/svg-icon");
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");
  const plugins = [
    Icons({
      compiler: "vue3",
      customCollections: {
        [collectionName]: FileSystemIconLoader2(
          localIconPath,
          (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      defaultClass: "inline-block"
    }),
    Components({
      dts: "src/typings/components.d.ts",
      types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        }),
        NaiveUiResolver(),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
      ]
    }),
    AutoImport({
      dts: "src/typings/auto-imports.d.ts",
      imports: [
        "vue",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
        }
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__"
    }),
    // 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz"
    })
  ];
  return plugins;
}

// ../../config/plugins/index.ts
function setupVitePlugins(viteEnv) {
  const plugins = [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    // VueDevtools(),
    // setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress()
  ];
  return plugins;
}

// src/utils/service.ts
function createServiceConfig(env) {
  const { VITE_SERVICE_BASE_URL, VITE_OTHER_SERVICE_BASE_URL } = env;
  let other = {};
  try {
    other = JSON.parse(VITE_OTHER_SERVICE_BASE_URL);
  } catch (error) {
    console.error("VITE_OTHER_SERVICE_BASE_URL is not a valid JSON string");
  }
  const httpConfig = {
    baseURL: VITE_SERVICE_BASE_URL,
    other
  };
  const otherHttpKeys = Object.keys(httpConfig.other);
  const otherConfig = otherHttpKeys.map((key) => {
    return {
      key,
      baseURL: httpConfig.other[key],
      proxyPattern: createProxyPattern(key)
    };
  });
  const config = {
    baseURL: httpConfig.baseURL,
    proxyPattern: createProxyPattern(),
    other: otherConfig
  };
  return config;
}
function createProxyPattern(key) {
  if (!key) {
    return "/proxy-default";
  }
  return `/proxy-${key}`;
}

// proxy.ts
function createViteProxy(env, isDev) {
  const isEnableHttpProxy = isDev && env.VITE_HTTP_PROXY === "Y";
  if (!isEnableHttpProxy) return void 0;
  const { baseURL, proxyPattern, other } = createServiceConfig(env);
  const proxy = createProxyItem({ baseURL, proxyPattern });
  other.forEach((item) => {
    Object.assign(proxy, createProxyItem(item));
  });
  return proxy;
}
function createProxyItem(item) {
  const proxy = {};
  proxy[item.proxyPattern] = {
    target: item.baseURL,
    changeOrigin: true,
    rewrite: (path3) => path3.replace(new RegExp(`^${item.proxyPattern}`), "")
  };
  return proxy;
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/canoe/code/hl-pro/web/apps/low-code/vite.config.ts";
var vite_config_default = defineConfig((configEnv) => {
  const viteEnv = loadEnv(
    configEnv.mode,
    process3.cwd()
  );
  const buildTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    plugins: setupVitePlugins(viteEnv),
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
      open: false,
      proxy: createViteProxy(viteEnv, configEnv.command === "serve"),
      fs: {
        cachedChecks: false
      }
    },
    preview: {
      port: 9725
    },
    build: {
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SOURCE_MAP === "Y",
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vY29uZmlnL3BsdWdpbnMvaW5kZXgudHMiLCAiLi4vLi4vY29uZmlnL3BsdWdpbnMvdW5vY3NzLnRzIiwgIi4uLy4uL2NvbmZpZy9wbHVnaW5zL3VucGx1Z2luLnRzIiwgInNyYy91dGlscy9zZXJ2aWNlLnRzIiwgInByb3h5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2Fub2VcXFxcY29kZVxcXFxobC1wcm9cXFxcd2ViXFxcXGFwcHNcXFxcbG93LWNvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhbm9lXFxcXGNvZGVcXFxcaGwtcHJvXFxcXHdlYlxcXFxhcHBzXFxcXGxvdy1jb2RlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYW5vZS9jb2RlL2hsLXByby93ZWIvYXBwcy9sb3ctY29kZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBwcm9jZXNzIGZyb20gXCJub2RlOnByb2Nlc3NcIjtcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCB7IHNldHVwVml0ZVBsdWdpbnMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3BsdWdpbnNcIjtcbmltcG9ydCB7IGNyZWF0ZVZpdGVQcm94eSB9IGZyb20gXCIuL3Byb3h5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoY29uZmlnRW52KSA9PiB7XG4gIGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KFxuICAgIGNvbmZpZ0Vudi5tb2RlLFxuICAgIHByb2Nlc3MuY3dkKCksXG4gICkgYXMgdW5rbm93biBhcyBFbnYuSW1wb3J0TWV0YTtcblxuICBjb25zdCBidWlsZFRpbWUgPSBkYXlqcygpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlOiB2aXRlRW52LlZJVEVfQkFTRV9VUkwsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJ+XCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCIuL3NyYy9zdHlsZXMvc2Nzcy9nbG9iYWwuc2Nzc1wiIGFzICo7YCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBzZXR1cFZpdGVQbHVnaW5zKHZpdGVFbnYpLFxuICAgIGRlZmluZToge1xuICAgICAgQlVJTERfVElNRTogSlNPTi5zdHJpbmdpZnkoYnVpbGRUaW1lKSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgICBwb3J0OiA5NTI3LFxuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBwcm94eTogY3JlYXRlVml0ZVByb3h5KHZpdGVFbnYsIGNvbmZpZ0Vudi5jb21tYW5kID09PSBcInNlcnZlXCIpLFxuICAgICAgZnM6IHtcbiAgICAgICAgY2FjaGVkQ2hlY2tzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwcmV2aWV3OiB7XG4gICAgICBwb3J0OiA5NzI1LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgICAgIHNvdXJjZW1hcDogdml0ZUVudi5WSVRFX1NPVVJDRV9NQVAgPT09IFwiWVwiLFxuICAgICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICAgIGlnbm9yZVRyeUNhdGNoOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYW5vZVxcXFxjb2RlXFxcXGhsLXByb1xcXFx3ZWJcXFxcY29uZmlnXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhbm9lXFxcXGNvZGVcXFxcaGwtcHJvXFxcXHdlYlxcXFxjb25maWdcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2Fub2UvY29kZS9obC1wcm8vd2ViL2NvbmZpZy9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG4vLyBpbXBvcnQgVnVlRGV2dG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICd2aXRlLXBsdWdpbi1wcm9ncmVzcydcbmltcG9ydCB7IHNldHVwRWxlZ2FudFJvdXRlciB9IGZyb20gJy4vcm91dGVyJ1xuaW1wb3J0IHsgc2V0dXBVbm9jc3MgfSBmcm9tICcuL3Vub2NzcydcbmltcG9ydCB7IHNldHVwVW5wbHVnaW4gfSBmcm9tICcuL3VucGx1Z2luJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBWaXRlUGx1Z2lucyh2aXRlRW52OiBFbnYuSW1wb3J0TWV0YSkge1xuICBjb25zdCBwbHVnaW5zOiBQbHVnaW5PcHRpb24gPSBbXG4gICAgdnVlKHtcbiAgICAgIHNjcmlwdDoge1xuICAgICAgICBkZWZpbmVNb2RlbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdnVlSnN4KCksXG4gICAgLy8gVnVlRGV2dG9vbHMoKSxcbiAgICAvLyBzZXR1cEVsZWdhbnRSb3V0ZXIoKSxcbiAgICBzZXR1cFVub2Nzcyh2aXRlRW52KSxcbiAgICAuLi5zZXR1cFVucGx1Z2luKHZpdGVFbnYpLFxuICAgIHByb2dyZXNzKCksXG4gIF1cblxuICByZXR1cm4gcGx1Z2luc1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYW5vZVxcXFxjb2RlXFxcXGhsLXByb1xcXFx3ZWJcXFxcY29uZmlnXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhbm9lXFxcXGNvZGVcXFxcaGwtcHJvXFxcXHdlYlxcXFxjb25maWdcXFxccGx1Z2luc1xcXFx1bm9jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhbm9lL2NvZGUvaGwtcHJvL3dlYi9jb25maWcvcGx1Z2lucy91bm9jc3MudHNcIjtpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB1bm9jc3MgZnJvbSAnQHVub2Nzcy92aXRlJztcbmltcG9ydCBwcmVzZXRJY29ucyBmcm9tICdAdW5vY3NzL3ByZXNldC1pY29ucyc7XG5pbXBvcnQgeyBGaWxlU3lzdGVtSWNvbkxvYWRlciB9IGZyb20gJ0BpY29uaWZ5L3V0aWxzL2xpYi9sb2FkZXIvbm9kZS1sb2FkZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVW5vY3NzKHZpdGVFbnY6IEVudi5JbXBvcnRNZXRhKSB7XG4gIGNvbnN0IHsgVklURV9JQ09OX1BSRUZJWCwgVklURV9JQ09OX0xPQ0FMX1BSRUZJWCB9ID0gdml0ZUVudjtcblxuICBjb25zdCBsb2NhbEljb25QYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2Zy1pY29uJyk7XG5cbiAgLyoqIFRoZSBuYW1lIG9mIHRoZSBsb2NhbCBpY29uIGNvbGxlY3Rpb24gKi9cbiAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBWSVRFX0lDT05fTE9DQUxfUFJFRklYLnJlcGxhY2UoYCR7VklURV9JQ09OX1BSRUZJWH0tYCwgJycpO1xuXG4gIHJldHVybiB1bm9jc3Moe1xuICAgIHByZXNldHM6IFtcbiAgICAgIHByZXNldEljb25zKHtcbiAgICAgICAgcHJlZml4OiBgJHtWSVRFX0lDT05fUFJFRklYfS1gLFxuICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgZXh0cmFQcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgY29sbGVjdGlvbnM6IHtcbiAgICAgICAgICBbY29sbGVjdGlvbk5hbWVdOiBGaWxlU3lzdGVtSWNvbkxvYWRlcihsb2NhbEljb25QYXRoLCBzdmcgPT5cbiAgICAgICAgICAgIHN2Zy5yZXBsYWNlKC9ePHN2Z1xccy8sICc8c3ZnIHdpZHRoPVwiMWVtXCIgaGVpZ2h0PVwiMWVtXCIgJylcbiAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgICAgIHdhcm46IHRydWVcbiAgICAgIH0pXG4gICAgXVxuICB9KTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2Fub2VcXFxcY29kZVxcXFxobC1wcm9cXFxcd2ViXFxcXGNvbmZpZ1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYW5vZVxcXFxjb2RlXFxcXGhsLXByb1xcXFx3ZWJcXFxcY29uZmlnXFxcXHBsdWdpbnNcXFxcdW5wbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhbm9lL2NvZGUvaGwtcHJvL3dlYi9jb25maWcvcGx1Z2lucy91bnBsdWdpbi50c1wiO2ltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIsIE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7IEZpbGVTeXN0ZW1JY29uTG9hZGVyIH0gZnJvbSAndW5wbHVnaW4taWNvbnMvbG9hZGVycydcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFVucGx1Z2luKHZpdGVFbnY6IEVudi5JbXBvcnRNZXRhKSB7XG4gIGNvbnN0IHsgVklURV9JQ09OX1BSRUZJWCwgVklURV9JQ09OX0xPQ0FMX1BSRUZJWCB9ID0gdml0ZUVudlxuXG4gIGNvbnN0IGxvY2FsSWNvblBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnLWljb24nKVxuXG4gIC8qKiBUaGUgbmFtZSBvZiB0aGUgbG9jYWwgaWNvbiBjb2xsZWN0aW9uICovXG4gIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gVklURV9JQ09OX0xPQ0FMX1BSRUZJWC5yZXBsYWNlKGAke1ZJVEVfSUNPTl9QUkVGSVh9LWAsICcnKVxuXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW1xuICAgIEljb25zKHtcbiAgICAgIGNvbXBpbGVyOiAndnVlMycsXG4gICAgICBjdXN0b21Db2xsZWN0aW9uczoge1xuICAgICAgICBbY29sbGVjdGlvbk5hbWVdOiBGaWxlU3lzdGVtSWNvbkxvYWRlcihsb2NhbEljb25QYXRoLCAoc3ZnKSA9PlxuICAgICAgICAgIHN2Zy5yZXBsYWNlKC9ePHN2Z1xccy8sICc8c3ZnIHdpZHRoPVwiMWVtXCIgaGVpZ2h0PVwiMWVtXCIgJyksXG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAgc2NhbGU6IDEsXG4gICAgICBkZWZhdWx0Q2xhc3M6ICdpbmxpbmUtYmxvY2snLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZHRzOiAnc3JjL3R5cGluZ3MvY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIHR5cGVzOiBbeyBmcm9tOiAndnVlLXJvdXRlcicsIG5hbWVzOiBbJ1JvdXRlckxpbmsnLCAnUm91dGVyVmlldyddIH1dLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICBpbXBvcnRTdHlsZTogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgICAgICBOYWl2ZVVpUmVzb2x2ZXIoKSxcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7IGN1c3RvbUNvbGxlY3Rpb25zOiBbY29sbGVjdGlvbk5hbWVdLCBjb21wb25lbnRQcmVmaXg6IFZJVEVfSUNPTl9QUkVGSVggfSksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgZHRzOiAnc3JjL3R5cGluZ3MvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAge1xuICAgICAgICAgICduYWl2ZS11aSc6IFsndXNlRGlhbG9nJywgJ3VzZU1lc3NhZ2UnLCAndXNlTm90aWZpY2F0aW9uJywgJ3VzZUxvYWRpbmdCYXInXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgaWNvbkRpcnM6IFtsb2NhbEljb25QYXRoXSxcbiAgICAgIHN5bWJvbElkOiBgJHtWSVRFX0lDT05fTE9DQUxfUFJFRklYfS1bZGlyXS1bbmFtZV1gLFxuICAgICAgaW5qZWN0OiAnYm9keS1sYXN0JyxcbiAgICAgIGN1c3RvbURvbUlkOiAnX19TVkdfSUNPTl9MT0NBTF9fJyxcbiAgICB9KSxcbiAgICAvLyBcdTUzOEJcdTdGMjlcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgdmVyYm9zZTogdHJ1ZSxcbiAgICAgIGRpc2FibGU6IGZhbHNlLFxuICAgICAgdGhyZXNob2xkOiAxMDI0MCxcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgICAgZXh0OiAnLmd6JyxcbiAgICB9KSxcbiAgXVxuXG4gIHJldHVybiBwbHVnaW5zXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhbm9lXFxcXGNvZGVcXFxcaGwtcHJvXFxcXHdlYlxcXFxhcHBzXFxcXGxvdy1jb2RlXFxcXHNyY1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2Fub2VcXFxcY29kZVxcXFxobC1wcm9cXFxcd2ViXFxcXGFwcHNcXFxcbG93LWNvZGVcXFxcc3JjXFxcXHV0aWxzXFxcXHNlcnZpY2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhbm9lL2NvZGUvaGwtcHJvL3dlYi9hcHBzL2xvdy1jb2RlL3NyYy91dGlscy9zZXJ2aWNlLnRzXCI7LyoqXG4gKiBDcmVhdGUgc2VydmljZSBjb25maWcgYnkgY3VycmVudCBlbnZcbiAqXG4gKiBAcGFyYW0gZW52IFRoZSBjdXJyZW50IGVudlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VydmljZUNvbmZpZyhlbnY6IEVudi5JbXBvcnRNZXRhKSB7XG4gIGNvbnN0IHsgVklURV9TRVJWSUNFX0JBU0VfVVJMLCBWSVRFX09USEVSX1NFUlZJQ0VfQkFTRV9VUkwgfSA9IGVudjtcblxuICBsZXQgb3RoZXIgPSB7fSBhcyBSZWNvcmQ8QXBwLlNlcnZpY2UuT3RoZXJCYXNlVVJMS2V5LCBzdHJpbmc+O1xuICB0cnkge1xuICAgIG90aGVyID0gSlNPTi5wYXJzZShWSVRFX09USEVSX1NFUlZJQ0VfQkFTRV9VUkwpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcignVklURV9PVEhFUl9TRVJWSUNFX0JBU0VfVVJMIGlzIG5vdCBhIHZhbGlkIEpTT04gc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBodHRwQ29uZmlnOiBBcHAuU2VydmljZS5TaW1wbGVTZXJ2aWNlQ29uZmlnID0ge1xuICAgIGJhc2VVUkw6IFZJVEVfU0VSVklDRV9CQVNFX1VSTCxcbiAgICBvdGhlclxuICB9O1xuXG4gIGNvbnN0IG90aGVySHR0cEtleXMgPSBPYmplY3Qua2V5cyhodHRwQ29uZmlnLm90aGVyKSBhcyBBcHAuU2VydmljZS5PdGhlckJhc2VVUkxLZXlbXTtcblxuICBjb25zdCBvdGhlckNvbmZpZzogQXBwLlNlcnZpY2UuT3RoZXJTZXJ2aWNlQ29uZmlnSXRlbVtdID0gb3RoZXJIdHRwS2V5cy5tYXAoa2V5ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5LFxuICAgICAgYmFzZVVSTDogaHR0cENvbmZpZy5vdGhlcltrZXldLFxuICAgICAgcHJveHlQYXR0ZXJuOiBjcmVhdGVQcm94eVBhdHRlcm4oa2V5KVxuICAgIH07XG4gIH0pO1xuXG4gIGNvbnN0IGNvbmZpZzogQXBwLlNlcnZpY2UuU2VydmljZUNvbmZpZyA9IHtcbiAgICBiYXNlVVJMOiBodHRwQ29uZmlnLmJhc2VVUkwsXG4gICAgcHJveHlQYXR0ZXJuOiBjcmVhdGVQcm94eVBhdHRlcm4oKSxcbiAgICBvdGhlcjogb3RoZXJDb25maWdcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG4vKipcbiAqIGdldCBiYWNrZW5kIHNlcnZpY2UgYmFzZSB1cmxcbiAqXG4gKiBAcGFyYW0gZW52IC0gdGhlIGN1cnJlbnQgZW52XG4gKiBAcGFyYW0gaXNQcm94eSAtIGlmIHVzZSBwcm94eVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VydmljZUJhc2VVUkwoZW52OiBFbnYuSW1wb3J0TWV0YSwgaXNQcm94eTogYm9vbGVhbikge1xuICBjb25zdCB7IGJhc2VVUkwsIG90aGVyIH0gPSBjcmVhdGVTZXJ2aWNlQ29uZmlnKGVudik7XG5cbiAgY29uc3Qgb3RoZXJCYXNlVVJMID0ge30gYXMgUmVjb3JkPEFwcC5TZXJ2aWNlLk90aGVyQmFzZVVSTEtleSwgc3RyaW5nPjtcblxuICBvdGhlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIG90aGVyQmFzZVVSTFtpdGVtLmtleV0gPSBpc1Byb3h5ID8gaXRlbS5wcm94eVBhdHRlcm4gOiBpdGVtLmJhc2VVUkw7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgYmFzZVVSTDogaXNQcm94eSA/IGNyZWF0ZVByb3h5UGF0dGVybigpIDogYmFzZVVSTCxcbiAgICBvdGhlckJhc2VVUkxcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXQgcHJveHkgcGF0dGVybiBvZiBiYWNrZW5kIHNlcnZpY2UgYmFzZSB1cmxcbiAqXG4gKiBAcGFyYW0ga2V5IElmIG5vdCBzZXQsIHdpbGwgdXNlIHRoZSBkZWZhdWx0IGtleVxuICovXG5mdW5jdGlvbiBjcmVhdGVQcm94eVBhdHRlcm4oa2V5PzogQXBwLlNlcnZpY2UuT3RoZXJCYXNlVVJMS2V5KSB7XG4gIGlmICgha2V5KSB7XG4gICAgcmV0dXJuICcvcHJveHktZGVmYXVsdCc7XG4gIH1cblxuICByZXR1cm4gYC9wcm94eS0ke2tleX1gO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYW5vZVxcXFxjb2RlXFxcXGhsLXByb1xcXFx3ZWJcXFxcYXBwc1xcXFxsb3ctY29kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2Fub2VcXFxcY29kZVxcXFxobC1wcm9cXFxcd2ViXFxcXGFwcHNcXFxcbG93LWNvZGVcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhbm9lL2NvZGUvaGwtcHJvL3dlYi9hcHBzL2xvdy1jb2RlL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNyZWF0ZVNlcnZpY2VDb25maWcgfSBmcm9tICcuL3NyYy91dGlscy9zZXJ2aWNlJztcblxuLyoqXG4gKiBTZXQgaHR0cCBwcm94eVxuICpcbiAqIEBwYXJhbSBlbnYgLSBUaGUgY3VycmVudCBlbnZcbiAqIEBwYXJhbSBpc0RldiAtIElzIGRldmVsb3BtZW50IGVudmlyb25tZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUHJveHkoZW52OiBFbnYuSW1wb3J0TWV0YSwgaXNEZXY6IGJvb2xlYW4pIHtcbiAgY29uc3QgaXNFbmFibGVIdHRwUHJveHkgPSBpc0RldiAmJiBlbnYuVklURV9IVFRQX1BST1hZID09PSAnWSc7XG5cbiAgaWYgKCFpc0VuYWJsZUh0dHBQcm94eSkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICBjb25zdCB7IGJhc2VVUkwsIHByb3h5UGF0dGVybiwgb3RoZXIgfSA9IGNyZWF0ZVNlcnZpY2VDb25maWcoZW52KTtcblxuICBjb25zdCBwcm94eTogUmVjb3JkPHN0cmluZywgUHJveHlPcHRpb25zPiA9IGNyZWF0ZVByb3h5SXRlbSh7IGJhc2VVUkwsIHByb3h5UGF0dGVybiB9KTtcblxuICBvdGhlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIGNyZWF0ZVByb3h5SXRlbShpdGVtKSk7XG4gIH0pO1xuXG4gIHJldHVybiBwcm94eTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJveHlJdGVtKGl0ZW06IEFwcC5TZXJ2aWNlLlNlcnZpY2VDb25maWdJdGVtKSB7XG4gIGNvbnN0IHByb3h5OiBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+ID0ge307XG5cbiAgcHJveHlbaXRlbS5wcm94eVBhdHRlcm5dID0ge1xuICAgIHRhcmdldDogaXRlbS5iYXNlVVJMLFxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtpdGVtLnByb3h5UGF0dGVybn1gKSwgJycpXG4gIH07XG5cbiAgcmV0dXJuIHByb3h5O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVCxPQUFPQSxjQUFhO0FBQ3RVLFNBQVMsS0FBSyxxQkFBcUI7QUFDbkMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXOzs7QUNGbEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUVuQixPQUFPLGNBQWM7OztBQ0pzUixPQUFPLGFBQWE7QUFDL1QsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLDRCQUE0QjtBQUU5QixTQUFTLFlBQVksU0FBeUI7QUFDbkQs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LE9BQU8sZ0JBQWdCLElBQUksQ0FBQztBQUFBLEVBQzVDLENBQUM7QUFFRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLGdCQUFnQixNQUFxQztBQUM1RCxRQUFNLFFBQXNDLENBQUM7QUFFN0MsUUFBTSxLQUFLLFlBQVksSUFBSTtBQUFBLElBQ3pCLFFBQVEsS0FBSztBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsU0FBUyxDQUFBQyxVQUFRQSxNQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxZQUFZLEVBQUUsR0FBRyxFQUFFO0FBQUEsRUFDdkU7QUFFQSxTQUFPO0FBQ1Q7OztBTG5DaU0sSUFBTSwyQ0FBMkM7QUFPbFAsSUFBTyxzQkFBUSxhQUFhLENBQUMsY0FBYztBQUN6QyxRQUFNLFVBQVU7QUFBQSxJQUNkLFVBQVU7QUFBQSxJQUNWQyxTQUFRLElBQUk7QUFBQSxFQUNkO0FBRUEsUUFBTSxZQUFZLE1BQU0sRUFBRSxPQUFPLHFCQUFxQjtBQUV0RCxTQUFPO0FBQUEsSUFDTCxNQUFNLFFBQVE7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDakQsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsaUJBQWlCLE9BQU87QUFBQSxJQUNqQyxRQUFRO0FBQUEsTUFDTixZQUFZLEtBQUssVUFBVSxTQUFTO0FBQUEsSUFDdEM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU8sZ0JBQWdCLFNBQVMsVUFBVSxZQUFZLE9BQU87QUFBQSxNQUM3RCxJQUFJO0FBQUEsUUFDRixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsc0JBQXNCO0FBQUEsTUFDdEIsV0FBVyxRQUFRLG9CQUFvQjtBQUFBLE1BQ3ZDLGlCQUFpQjtBQUFBLFFBQ2YsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInByb2Nlc3MiLCAicHJvY2VzcyIsICJwYXRoIiwgIkZpbGVTeXN0ZW1JY29uTG9hZGVyIiwgInBhdGgiLCAicHJvY2VzcyIsICJGaWxlU3lzdGVtSWNvbkxvYWRlciIsICJwYXRoIiwgInByb2Nlc3MiXQp9Cg==
