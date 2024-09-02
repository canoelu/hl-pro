import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./index.vue'),
  images: () => import('./border05.png'),
  manifest
}
