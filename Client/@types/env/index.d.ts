declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_DEVELOPMENT_SERVER: string;
    NEXT_PUBLIC_PRODUCTION_SERVER: string;

    NEXT_PUBLIC_STRIPE_TEST_KEY: string;

    NEXT_PUBLIC_APOLLO_URL: string;
  }
}
