import express from 'express';
import {
    Create,
    deleteUserById,
    getAllUsers,
    login,
    updateImageByEmail
} from './controller.js';

import { upload } from './multer.js';
import { verifyToken } from './Auth.js';

const router = express.Router();

router.post("/create", upload.single("image"), Create);
router.post("/login", login);
router.put("/update-image", verifyToken, upload.single("image"), updateImageByEmail);
router.get("/all", verifyToken, getAllUsers);
router.delete("/delete/:id", verifyToken, deleteUserById);

export default router;
