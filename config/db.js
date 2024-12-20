const mongoose= require("mongoose")
const connectDB= async()=>{
try {
   const conn= await mongoose.connect(process.env.MONGODB_URL) 
   console.log(`connected to mongodb  Database ${conn.connection.host}` )
} catch (error) {
    console.log(error.message )
}
}

module.exports= connectDB