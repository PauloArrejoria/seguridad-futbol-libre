declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string
        UI_URL: string
        NODE_ENV: string
        GOOGLE_RECAPTCHA_SCORE: string
        GOOGLE_RECAPTCHA_PRIVATE_KEY: string
        SQL_DB_NAME: string
        SQL_DB_USER: string
        SQL_DB_PASSWORD: string
        SQL_DB_HOST: string
        SQL_DB_PORT: number
    }
}