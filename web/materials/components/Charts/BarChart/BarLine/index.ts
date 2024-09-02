import manifest from './manifest.json'

export default {
  component: () => import('./index.vue'),
  config: () => import('./config'),
  images: () => import('./bar_line.png'),
  manifest
}
