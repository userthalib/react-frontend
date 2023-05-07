import express from "express";
import {
    getKategoriSoals,
    getKategoriSoalById,
    createKategoriSoal,
    updateKategoriSoal,
    deleteKategoriSoal
} from "../controllers/KategoriSoals.js";
// import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get('/products',verifyUser, getProducts);
// router.get('/products/:id',verifyUser, getProductById);
// router.post('/products',verifyUser, createProduct);
// router.patch('/products/:id',verifyUser, updateProduct);
// router.delete('/products/:id',verifyUser, deleteProduct);
router.get('/kategori_soal', getKategoriSoals);
router.get('/kategori_soal/:id', getKategoriSoalById);
router.post('/kategori_soal', createKategoriSoal);
router.patch('/kategori_soal/:id', updateKategoriSoal);
router.delete('/kategori_soal/:id', deleteKategoriSoal);

export default router;