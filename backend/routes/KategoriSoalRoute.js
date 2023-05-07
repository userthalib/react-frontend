import express from "express";
import {
    getKategoriSoals,
    getKategoriSoalById,
    createKategoriSoal,
    updateKategoriSoal,
    deleteKategoriSoal
} from "../controllers/KategoriSoals.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/kategori_soal',verifyUser, getKategoriSoals);
router.get('/kategori_soal/:id',verifyUser, getKategoriSoalById);
router.post('/kategori_soal',verifyUser, createKategoriSoal);
router.patch('/kategori_soal/:id',verifyUser, updateKategoriSoal);
router.delete('/kategori_soal/:id',verifyUser, deleteKategoriSoal);

export default router;