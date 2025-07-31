import {Router} from "express";
import {registration,loginCandidate,sendVerificationCode} from "../controllers/candidateRegistration.controller.js"

const router = Router();

router.route("/first-registration").post(registration);
router.route("/login").post(loginCandidate);
router.route("/send-Otp").post(sendVerificationCode);
export default router;