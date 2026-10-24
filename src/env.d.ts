declare namespace NodeJS {
  interface ProcessEnv {
    /** Public origin of the deployed site, e.g. https://www.example.com (see .env.example). */
    readonly NEXT_PUBLIC_SITE_URL?: string;
  }
}
