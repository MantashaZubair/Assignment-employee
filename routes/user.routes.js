const express= require("express")
const {  getUser,getUsername,deleteUser,getUserById,searchUser, updateUser } = require("../controllers/user.controller")
const { validateSchema } = require("../middleware/validatemiddleware")
const {userUpdateValidationSchema} = require("../validation/userValidation")
const verifyauthJwttoken = require("../middleware/authMiddleware")
const verifyAdmin = require("../middleware/adminMiddleware")
const { fetchUserIdInCollection } = require("../middleware/userMiddleware")
const { cloudinaryFileUploader } = require("../middleware/FileUploader")
const router= express.Router()
const validateUpdateUser=validateSchema(userUpdateValidationSchema)

// get user
router.get("/",verifyauthJwttoken,fetchUserIdInCollection,verifyAdmin,getUser)

// search user
router.get("/search",searchUser)

// protected route for admin
router.get('/admin-auth', verifyauthJwttoken ,fetchUserIdInCollection,verifyAdmin, (req,res)=>{
    try {
        res.status(200).send({ok:true})  
    } catch (error) {
     console.log(error)   
    }
   
})

// protected route for user
router.get('/user-auth',verifyauthJwttoken , (req,res)=>{
    res.status(200).send({ok:true})
})


// get user by Id
router.get("/:id",getUserById)

// get user by Username
router.get("/:username",getUsername)
// router.post("/",validateUser,createUser)

// update user
router.put("/:id",cloudinaryFileUploader.single('profileImage'),validateUpdateUser,verifyauthJwttoken,updateUser)

// delete User
router.delete("/:id",deleteUser)

module.exports= router