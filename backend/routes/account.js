const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const {Account} = require('../db');
const { authMiddleware } = require('../middleware');

router.get("/balance",authMiddleware,async(req,res)=>{
      const account = await Account.findOne({
        userid : req.userid
      })

      res.json({
        balance:account.balance
      })
})

//---------------- Transactions ------------

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;

    // Fetch the acount within the transactions
     const account= await Account.findOne({userid:req.userid}).session(session);
      console.log(req.userid)
     if(!account || account.balance <amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        })
     }

     const toAccount = await Account.find({userid:to}).session(session);
     if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        })
     }

     //perform the transfer
     await Account.updateOne({userid:req.userid},{$inc:{balance:-amount}}).session(session);
     await Account.updateOne({userid:to},{$inc:{balance:amount}}).session(session);

     //commit the transaction

     await session.commitTransaction();
     res.json({
        message:"Transfer Successfull"
     });
});
module.exports= router;
