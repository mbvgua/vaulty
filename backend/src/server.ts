import express,{Request,Response} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT

app.get('/hello',(request:Request,response:Response)=>{
    response.status(200).json('How you doing?')
})


app.listen(port,()=>{
    console.log(`[server] app is running at http://localhost:${port}...`)
})
