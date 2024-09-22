const express= require('express');
const router= express.Router();
const zod=require("zod");
const {User,Account} = require("../db");
const {JWT_SECRET} = require('../config')
const jwt= require('jsonwebtoken');
const {authMiddleware}= require('../middleware')

const signupBody=zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})
//----------------------------SIGNUP-----------

router.post("/signup",async (req,res)=>{
    
    const parseResult=signupBody.safeParse(req.body)
    console.log(req.body)
    if(!parseResult.success){
       
        return res.status(411).json({
            message:'incorrect input',
            error:parseResult.error.errors
        });
       
    }

    const existingUser= await User.findOne({
        username:req.body.username
    
    })
 

    if(existingUser){
        return res.status(411).json({
            message:'email already taken / incorrect inputs'
        })
    }

    const user= await User.create({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    const userid=user._id;
 ///--------------create a new account -----------
      
 await Account.create({
    userid,
    balance:1+Math.random()*10000
 })

    const token = jwt.sign({
        userid
    },JWT_SECRET)

    res.json({
        message:'user created successfully',
        token:token
    })

});

// ---------------------------SIGN IN ------------------\
const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})
router.post('/signin',async(req,res)=>{
    const {success}=signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"email already taken / incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if(user){
        const token= jwt.sign({
            userid:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return ;
    }

    res.status(411).json({
        message:"error while log in "
    })

})

//-------------------Update info ---------

// other auth routes

const updateBody = zod.object({
    password:zod.string().optional(),
    firtname:zod.string().optional(),
    lastname:zod.string().optional()
})

router.put("/", authMiddleware,async(req,res)=>{
    const {success}=updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"error while updating information "
        })
    }

    await User.updateOne({_id:req.userid},req.body);
    res.json({
        message:"update successfully"
    })
})

// -------------------Get a other users-----------

router.get("/bulk",authMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    const users= await User.find({
        _id: { $ne: req.userid },
        $or:[{firstname:{$regex:filter}},{lastname:{$regex:filter}}]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})

router.get("/userInfo",authMiddleware,async(req,res)=>{
    try{
        const user= await User.findById(req.userid,'username firstname lastname')
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        res.json({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname
        })
    }catch(error){
        res.status(500).json({message:"error fetching info"})
    }

})
    


module.exports=router;
