import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const fileName = `${Math.ceil(Math.random()*10e16)}.png`
        cb(null,fileName)
    }
})

const upload = multer({
    storage,
})

export default upload