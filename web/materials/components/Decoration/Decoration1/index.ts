import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./index.vue'),
  images:()=>import('./decorates01.png'),
  manifest
}
