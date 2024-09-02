import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./index.vue'),
  images: () => import('./border02.png'),
  manifest
}
