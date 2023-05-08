import KategoriSoal from "../models/KategoriSoalModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getKategoriSoals = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await KategoriSoal.findAll({
                attributes:['uuid','name'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await KategoriSoal.findAll({
                attributes:['uuid','name'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKategoriSoalById = async(req, res) =>{
    try {
        const kategoriSoal = await KategoriSoal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!kategoriSoal) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await KategoriSoal.findOne({
                attributes:['uuid','name'],
                where:{
                    id: kategoriSoal.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await KategoriSoal.findOne({
                attributes:['uuid','name'],
                where:{
                    [Op.and]:[{id: kategoriSoal.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createKategoriSoal = async(req, res) =>{
    const {name} = req.body;
    try {
        await KategoriSoal.create({
            name: name, 
            userId: req.userId
        });
        res.status(201).json({msg: "Kategori Soal Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateKategoriSoal = async(req, res) =>{
    try {
        const kategoriSoal = await KategoriSoal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!kategoriSoal) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name} = req.body;
        if(req.role === "admin"){
            await KategoriSoal.update({name},{
                where:{
                    id: kategoriSoal.id
                }
            });
        }else{
            if(req.userId !== kategoriSoal.userId) return res.status(403).json({msg: "Akses terlarang"});
            await KategoriSoal.update({name},{
                where:{
                    [Op.and]:[{id: kategoriSoal.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteKategoriSoal = async(req, res) =>{
    try {
        const kategoriSoal = await KategoriSoal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!kategoriSoal) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name} = req.body;
        if(req.role === "admin"){
            await KategoriSoal.destroy({
                where:{
                    id: kategoriSoal.id
                }
            });
        }else{
            if(req.userId !== kategoriSoal.userId) return res.status(403).json({msg: "Akses terlarang"});
            await KategoriSoal.destroy({
                where:{
                    [Op.and]:[{id: kategoriSoal.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}