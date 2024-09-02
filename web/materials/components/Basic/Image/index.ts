import manifest from './manifest.json'

export default {
  component: () => import('./Image.vue'),
  config: () => import('./config'),
  images: () => import('./image.png'),
  manifest
}
