import {Router} from "express"
import {
    registerPersonalInfo,
  registerAcademicInfo,
  registerSubjectInfo,
  submitFinalApplication,
  traceApplicationStatus,
} from "../controllers/personalInfo.controller.js"
  import { authMiddleware } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/imageMulter.middleware.js";
const router = Router();
router.route("/create").post(upload.fields([
        {
            name:"candidate_photo",
            maxCount:1
        },
        {
            name:"candidate_signature",
            maxCount:1
        }                 
   ]),authMiddleware,registerPersonalInfo)
router.post("/register/academic-info", authMiddleware, registerAcademicInfo);


router.post("/register/subject-info", authMiddleware, registerSubjectInfo);


router.post("/register/submit", authMiddleware, submitFinalApplication);


router.get("/register/status/:applicationId", traceApplicationStatus);

export default router;