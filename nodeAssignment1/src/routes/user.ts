import { Router } from "express";
import { getUsers } from "../controller/user";
import { Auth } from "../middleware/Auth";
import { getUserSchema } from "../schema/userSchema";
import { validateReqQuery } from "../middleware/validator";

const router = Router();

router.route("/").get(Auth, validateReqQuery(getUserSchema), getUsers); // Get the list of users

export default router;
