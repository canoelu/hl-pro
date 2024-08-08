import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./index.vue'),
  manifest,
  images: () => import('./bar_line.png')
}
