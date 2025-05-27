export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CARGO_REQUEST: '/cargo-request',
  CARGO_REQUEST_SUBMISSION: '/cargo-request-submission',
  PROFILE: '/profile',
  MY_REQUESTS: '/my-requests'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

// Helper function to get route path
export const getRoutePath = (route: RouteKey): RoutePath => ROUTES[route]; 