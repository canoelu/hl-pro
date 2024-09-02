import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./src/StereoscopicBarChart.vue'),
  images: () => import('./bar_x.png'),
  manifest
}
