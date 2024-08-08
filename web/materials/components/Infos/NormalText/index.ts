import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./index.vue'),
  manifest,
  images: () => import('./text_static.png')
}
