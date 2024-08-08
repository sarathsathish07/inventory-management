import express from 'express';
import { multerUploadUserProfile } from "../config/multerConfig.js";
import { authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router()


router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(multerUploadUserProfile.single('profileImageName'),protect,updateUserProfile);

export default router
