const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');


const medicine=require('../n_models/m_Medicines');





router.post("/med",(req,res)=>{
    const Medicines = new medicine({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        id: req.body.id,
        strength:req.body.strength,
        manufacturer:req.body.manufacturer,
        description:req.body.description,
        m_price:req.body.m_price,
        r_price:req.body.r_price,
        

    });
    Medicines.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occured"});
    })
})

router.get('/show',(req,res)=>{
    medicine.find()
    .then(medicine=>res.json(medicine))
    .catch(err=>res.status(404).json({ noMedicinesfound: 'No Medicines found' }))
})



module.exports = router;
