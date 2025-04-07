import { Router } from "express";
import { Login, CheckLogin } from "@api/controller/auth";
import tokenValidation from "@api/middleware/token-validation";
import recaptchaValidation from "@api/middleware/recaptcha-validation";

const router = Router();

router.get('/auth', tokenValidation, CheckLogin);
router.put('/auth/login', recaptchaValidation, Login);

export default router;
