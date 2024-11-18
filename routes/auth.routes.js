const express= require("express")
const router= express.Router()
const {register,login, logout}= require("../controllers/auth.controller")
const { validateSchema } = require("../middleware/validatemiddleware")
const {fetchUsernameInCollection}= require("../middleware/userMiddleware")
const  {registerValidationSchema,loginBodyValidationSchema}  = require("../validation/authValidation")
const validateRegisterUser=validateSchema(registerValidationSchema)
const validateLoginUser= validateSchema(loginBodyValidationSchema)

//  register user
router.post("/register",validateRegisterUser, register )

//  login user and Admin
router.post("/login",validateLoginUser,fetchUsernameInCollection, login )

router.post("/logout", logout)



module.exports=router