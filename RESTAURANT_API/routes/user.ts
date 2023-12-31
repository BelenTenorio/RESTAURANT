import express from 'express';
import {registro_user,Information_user,login_user} from '../controllers/userController';
const router = express.Router();

router.get('/', Information_user);
router.post('/', registro_user);
router.post('/', login_user);

export default router;



