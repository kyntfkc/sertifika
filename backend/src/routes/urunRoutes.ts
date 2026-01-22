import express from 'express';
import {
  getAllUrunler,
  getUrunById,
  createUrun,
  updateUrun,
  deleteUrun,
  getUrunResim,
} from '../controllers/urunController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllUrunler);
router.get('/:id', getUrunById);
router.post('/', upload.single('urun_resmi'), createUrun);
router.put('/:id', upload.single('urun_resmi'), updateUrun);
router.delete('/:id', deleteUrun);
router.get('/:id/resim', getUrunResim);

export default router;
