import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export type LoginStatusType = 'init' | 'logged' | 'authed' | 'coded' | 'complete';
export const loadingActions: Record<LoginStatusType, (router: AppRouterInstance) => void> = {
  init: (router) => router.replace('/auth'),
  logged: (router) => router.replace('/user/profile'),
  authed: (router) => router.replace('/user/marry/code'),
  coded: (router) => router.replace('/user/marry/info'),
  complete: (router) => router.replace('/main'),
};
