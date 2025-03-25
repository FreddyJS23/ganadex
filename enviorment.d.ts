declare namespace NodeJS {
    export interface ProcessEnv {
        readonly APP_ENV: 'local' | 'development' | 'production';
        readonly API_URL: string;
        readonly ORIGIN: string;
        readonly AUTH_SECRET: string;
        readonly NEXT_PUBLIC_BASE_URL: string;
    }
}
