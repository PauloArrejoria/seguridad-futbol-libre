import { Router } from "express";
import { HealthCheck, Login } from "@api/controller/public";
import recaptchaValidation from "@api/middleware/recaptcha-validation";


const router = Router();
 
router.get('/', HealthCheck);
router.put('/login', recaptchaValidation, Login);

export default router;