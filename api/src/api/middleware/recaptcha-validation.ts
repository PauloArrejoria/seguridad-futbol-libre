import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "@api/error/unauthorized-error";
import axios from "axios";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const url = 'https://www.google.com/recaptcha/api/siteverify';
        const token = req.headers['recaptcha-token'] ?? "";

        const response = await axios.post(url, null, {
            params: {
                secret: process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY,
                response: token
            }
        });

        if (!response.data.success) {
            next(new UnauthorizedError("Recaptcha invalido", new Error(JSON.stringify(response.data['error-codes']))));
        }

        if (response.data.score < process.env.GOOGLE_RECAPTCHA_SCORE) {
            next(new UnauthorizedError("Score invalido de Recaptcha", new Error()));
        }

        next();
    }
    catch (err: any)
    {
        next(new UnauthorizedError("ReCaptcha Validation Error", err));
    }
}