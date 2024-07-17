/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { RouteComponent } from "vue-router";
import type { LastLevelRouteKey, RouteLayout } from "@elegant-router/types";

import BaseLayout from "@/layouts/base-layout/index.vue";
import BlankLayout from "@/layouts/blank-layout/index.vue";

export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views: Record<LastLevelRouteKey, RouteComponent | (() => Promise<RouteComponent>)> = {
  403: () => import("@/views/_builtin/403/index.vue"),
  404: () => import("@/views/_builtin/404/index.vue"),
  500: () => import("@/views/_builtin/500/index.vue"),
  "iframe-page": () => import("@/views/_builtin/iframe-page/[url].vue"),
  login: () => import("@/views/_builtin/login/index.vue"),
  about: () => import("@/views/about/index.vue"),
  community: () => import("@/views/community/index.vue"),
  design: () => import("@/views/design/index.vue"),
  home: () => import("@/views/home/index.vue"),
  manage_api: () => import("@/views/manage/api/index.vue"),
  manage_log: () => import("@/views/manage/log/index.vue"),
  manage_menu: () => import("@/views/manage/menu/index.vue"),
  manage_role: () => import("@/views/manage/role/index.vue"),
  "manage_user-detail": () => import("@/views/manage/user-detail/[id].vue"),
  manage_user: () => import("@/views/manage/user/index.vue"),
  project: () => import("@/views/project/index.vue"),
  template: () => import("@/views/template/index.vue"),
  "user-center": () => import("@/views/user-center/index.vue"),
};
