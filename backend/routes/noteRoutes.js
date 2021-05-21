import express from "express";
const router = express.Router();
import {
  createNote,
  getNotes,
  getNoteById,
  updateProduct,
  deleteProduct,
  copyNote,
} from "../controllers/notesController";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getNotes).post(protect, createNote);
router.route("/copy/:id").post(protect, copyNote);
// router.route("/:id/reviews").post(protect, createProductReview);
// router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
