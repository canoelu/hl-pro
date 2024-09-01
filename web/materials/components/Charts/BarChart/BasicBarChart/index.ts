import manifest from './manifest.json'

export default {
  component: () => import('./BasicBarChart.vue'),
  config: () => import('./config'),
  images: () => import('./bar_line.png'),
  manifest
}
