import {Router} from "express"
import {registerAllInfo} from "../controllers/personalInfo.controller.js"
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
   ]),registerAllInfo)


export default router;