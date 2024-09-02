import manifest from './manifest.json'

export default {
  component: () => import('./src/MapChart.vue'),
  config: () => import('./config'),
  images: () => import('./map.png'),

  manifest
}
