import { Router } from "express";
import { getAllStatuses, getStatusById } from "../controllers/statusController";
import { validateStatusId } from "../validations/statusValidate";

const router = Router();

router.get("/", getAllStatuses);
router.get("/:id", validateStatusId, getStatusById);

export default router;
