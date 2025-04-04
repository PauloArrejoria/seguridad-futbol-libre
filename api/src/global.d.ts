declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string
        UI_URL: string
        NODE_ENV: string
        GOOGLE_RECAPTCHA_SCORE: string
        GOOGLE_RECAPTCHA_PRIVATE_KEY: string
    }
}