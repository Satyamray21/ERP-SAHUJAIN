import {Router} from "express";
import {registration,loginCandidate} from "../controllers/candidateRegistration.controller.js"

const router = Router();

router.route("/first-registration").post(registration);
router.route("/login").post(loginCandidate);
export default router;