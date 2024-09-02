import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./StaticText.vue'),
  images: () => import('./text_static.png'),

  manifest
}
