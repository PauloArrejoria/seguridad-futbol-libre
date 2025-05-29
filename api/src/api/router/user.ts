import { Router } from "express";
import {
    Create,
    GetList,
    UpdateResumme
} from "@api/controller/user";

import tokenValidation from "@api/middleware/token-validation";

const router = Router();

router.get('/user', tokenValidation, GetList);
router.post('/user', tokenValidation, Create);
router.put('/user/:id', tokenValidation, UpdateResumme);

export default router;