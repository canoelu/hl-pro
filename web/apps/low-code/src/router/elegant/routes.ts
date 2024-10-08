/* eslint-disable */
/* prettier-ignore */
// 
// Read more: 

import type { GeneratedRoute } from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'about',
    path: '/about',
    component: 'layout.base$view.about',
    meta: {
      title: 'about',
      i18nKey: 'route.about',
      icon: 'fluent:book-information-24-regular',
      order: 10
    }
  },
  {
    name: 'community',
    path: '/community',
    component: 'layout.base$view.community',
    meta: {
      title: 'community',
      i18nKey: 'route.community'
    }
  },
  {
    name: 'design',
    path: '/design',
    component: 'layout.base',
    meta: {
      title: 'design',
      i18nKey: 'route.design'
    },
    children: [
      {
        name: 'design_modules',
        path: '/design/modules',
        meta: {
          title: 'design_modules',
          i18nKey: 'route.design_modules'
        },
        children: [
          {
            name: 'design_modules_design-configs',
            path: '/design/modules/design-configs',
            meta: {
              title: 'design_modules_design-configs',
              i18nKey: 'route.design_modules_design-configs'
            },
            children: [
              {
                name: 'design_modules_design-configs_animation-config',
                path: '/design/modules/design-configs/animation-config',
                component: 'view.design_modules_design-configs_animation-config',
                meta: {
                  title: 'design_modules_design-configs_animation-config',
                  i18nKey: 'route.design_modules_design-configs_animation-config'
                }
              },
              {
                name: 'design_modules_design-configs_component-config',
                path: '/design/modules/design-configs/component-config',
                component: 'view.design_modules_design-configs_component-config',
                meta: {
                  title: 'design_modules_design-configs_component-config',
                  i18nKey: 'route.design_modules_design-configs_component-config'
                }
              },
              {
                name: 'design_modules_design-configs_data-source-config',
                path: '/design/modules/design-configs/data-source-config',
                component: 'view.design_modules_design-configs_data-source-config',
                meta: {
                  title: 'design_modules_design-configs_data-source-config',
                  i18nKey: 'route.design_modules_design-configs_data-source-config'
                }
              },
              {
                name: 'design_modules_design-configs_design-page-config',
                path: '/design/modules/design-configs/design-page-config',
                component: 'view.design_modules_design-configs_design-page-config',
                meta: {
                  title: 'design_modules_design-configs_design-page-config',
                  i18nKey: 'route.design_modules_design-configs_design-page-config'
                }
              },
              {
                name: 'design_modules_design-configs_event-config',
                path: '/design/modules/design-configs/event-config',
                component: 'view.design_modules_design-configs_event-config',
                meta: {
                  title: 'design_modules_design-configs_event-config',
                  i18nKey: 'route.design_modules_design-configs_event-config'
                }
              }
            ]
          },
          {
            name: 'design_modules_design-datasource',
            path: '/design/modules/design-datasource',
            component: 'view.design_modules_design-datasource',
            meta: {
              title: 'design_modules_design-datasource',
              i18nKey: 'route.design_modules_design-datasource'
            }
          },
          {
            name: 'design_modules_design-edit',
            path: '/design/modules/design-edit',
            component: 'view.design_modules_design-edit',
            meta: {
              title: 'design_modules_design-edit',
              i18nKey: 'route.design_modules_design-edit'
            }
          },
          {
            name: 'design_modules_design-filter',
            path: '/design/modules/design-filter',
            component: 'view.design_modules_design-filter',
            meta: {
              title: 'design_modules_design-filter',
              i18nKey: 'route.design_modules_design-filter'
            }
          },
          {
            name: 'design_modules_design-header',
            path: '/design/modules/design-header',
            component: 'view.design_modules_design-header',
            meta: {
              title: 'design_modules_design-header',
              i18nKey: 'route.design_modules_design-header'
            }
          },
          {
            name: 'design_modules_design-history',
            path: '/design/modules/design-history',
            component: 'view.design_modules_design-history',
            meta: {
              title: 'design_modules_design-history',
              i18nKey: 'route.design_modules_design-history'
            }
          },
          {
            name: 'design_modules_design-layout',
            path: '/design/modules/design-layout',
            component: 'view.design_modules_design-layout',
            meta: {
              title: 'design_modules_design-layout',
              i18nKey: 'route.design_modules_design-layout'
            }
          },
          {
            name: 'design_modules_design-material',
            path: '/design/modules/design-material',
            component: 'view.design_modules_design-material',
            meta: {
              title: 'design_modules_design-material',
              i18nKey: 'route.design_modules_design-material'
            }
          },
          {
            name: 'design_modules_design-menu',
            path: '/design/modules/design-menu',
            component: 'view.design_modules_design-menu',
            meta: {
              title: 'design_modules_design-menu',
              i18nKey: 'route.design_modules_design-menu'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      i18nKey: 'route.home',
      icon: 'mdi:monitor-dashboard',
      order: 1
    }
  },
  {
    name: 'iframe-page',
    path: '/iframe-page/:url',
    component: 'layout.base$view.iframe-page',
    props: true,
    meta: {
      title: 'iframe-page',
      i18nKey: 'route.iframe-page',
      constant: true,
      hideInMenu: true,
      keepAlive: true
    }
  },
  {
    name: 'login',
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: 'layout.blank$view.login',
    props: true,
    meta: {
      title: 'login',
      i18nKey: 'route.login',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'manage',
    path: '/manage',
    component: 'layout.base',
    meta: {
      title: 'manage',
      i18nKey: 'route.manage',
      icon: 'carbon:cloud-service-management',
      order: 9,
      roles: ['R_ADMIN']
    },
    children: [
      {
        name: 'manage_api',
        path: '/manage/api',
        component: 'view.manage_api',
        meta: {
          title: 'manage_api',
          i18nKey: 'route.manage_api'
        }
      },
      {
        name: 'manage_log',
        path: '/manage/log',
        component: 'view.manage_log',
        meta: {
          title: 'manage_log',
          i18nKey: 'route.manage_log'
        }
      },
      {
        name: 'manage_menu',
        path: '/manage/menu',
        component: 'view.manage_menu',
        meta: {
          title: 'manage_menu',
          i18nKey: 'route.manage_menu',
          icon: 'material-symbols:route',
          order: 3,
          roles: ['R_ADMIN'],
          keepAlive: true
        }
      },
      {
        name: 'manage_role',
        path: '/manage/role',
        component: 'view.manage_role',
        meta: {
          title: 'manage_role',
          i18nKey: 'route.manage_role',
          icon: 'carbon:user-role',
          order: 2,
          roles: ['R_SUPER']
        }
      },
      {
        name: 'manage_user',
        path: '/manage/user',
        component: 'view.manage_user',
        meta: {
          title: 'manage_user',
          i18nKey: 'route.manage_user',
          icon: 'ic:round-manage-accounts',
          order: 1,
          roles: ['R_ADMIN']
        }
      },
      {
        name: 'manage_user-detail',
        path: '/manage/user-detail/:id',
        component: 'view.manage_user-detail',
        props: true,
        meta: {
          title: 'manage_user-detail',
          i18nKey: 'route.manage_user-detail',
          hideInMenu: true,
          roles: ['R_ADMIN'],
          activeMenu: 'manage_user'
        }
      }
    ]
  },
  {
    name: 'project',
    path: '/project',
    component: 'layout.base$view.project',
    meta: {
      title: 'project',
      i18nKey: 'route.project'
    }
  },
  {
    name: 'template',
    path: '/template',
    component: 'layout.base$view.template',
    meta: {
      title: 'template',
      i18nKey: 'route.template'
    }
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: 'layout.base$view.user-center',
    meta: {
      title: 'user-center',
      i18nKey: 'route.user-center',
      hideInMenu: true
    }
  }
];
