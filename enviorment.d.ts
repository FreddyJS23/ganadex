declare namespace NodeJS {
    export interface ProcessEnv {
        readonly API_URL: string;
        readonly ORIGIN: string;
        readonly AUTH_SECRET: string;
    }
}
